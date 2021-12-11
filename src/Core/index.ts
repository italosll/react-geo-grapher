/* eslint-disable prefer-destructuring */
import {
  point,
  featureCollection,
  envelope,
  bboxPolygon,
  bboxClip,
  BBox,
  polygon,
  area,
  Polygon,
  Feature,
  Geometry,
  Properties,
  MultiPolygon,
  Units,
  squareGrid,
  centerOfMass,
  lineString,
  lineIntersect,
  booleanWithin,
} from '@turf/turf'

export function getBbox(data: any[]) {
  const coordinates = data[0]?.geometry?.coordinates[0]
  const turfPoints: Feature<Geometry, Properties>[] = []

  coordinates?.map((value: number[]) => {
    turfPoints?.push(point([value[0], value[1]]))
  })

  const featureCollectionOfPoints = featureCollection(turfPoints)
  const enveloped = envelope(featureCollectionOfPoints)
  const poly = bboxPolygon(enveloped?.bbox as BBox)
  return poly
}

export function getLimits(cliped: string | any[]) {
  const percents = []

  for (let i = 0; i < cliped?.length; i++) {
    const sectionsBbox = []
    // @ts-ignore
    sectionsBbox[i] = getBbox([cliped[i]])
    percents[i] = [
      // @ts-ignore
      sectionsBbox[i]?.geometry?.coordinates[0][0][1],
      // @ts-ignore
      sectionsBbox[i]?.geometry?.coordinates[0][2][1],
    ]
  }

  return percents
}

export function calcularAreaOriginal(data: any[]) {
  const polygonSelected = polygon(data[0]?.geometry?.coordinates)
  const areaSelected = area(polygonSelected)
  return areaSelected
}

export function definePolyBasedPercentage(
  map: { features: any },
  bboxAuxiliary: { bbox: number[]; geometry: { coordinates: number[][][] } },
  targetPercentage: number,
  inferiorLimit: number,
  higherLimit: number,
) {
  const totalArea = calcularAreaOriginal(map?.features)
  const interval = higherLimit - inferiorLimit
  const distribution = []

  for (let i = 0; i < 100; i++) {
    // @ts-ignore
    distribution[99 - i] = higherLimit - (interval * i) / 100
  }

  let previousClipedArea = bboxClip(
    map?.features[0]?.geometry,
    bboxAuxiliary?.bbox as BBox,
  )

  for (let j = 0; j < 100; j++) {
    const aux = distribution[j]
    bboxAuxiliary!.bbox[3] = aux
    bboxAuxiliary!.geometry!.coordinates[0][2][1] = aux
    bboxAuxiliary!.geometry!.coordinates[0][3][1] = aux
    const cliped = bboxClip(
      map!.features[0]!.geometry,
      bboxAuxiliary!.bbox as BBox,
    )

    const clipedArea = calcularAreaOriginal([cliped])
    const clipedPercentualOfTotalArea = (clipedArea * 100) / totalArea

    if (clipedPercentualOfTotalArea >= targetPercentage) {
      previousClipedArea = cliped
      break
    } else previousClipedArea = cliped
  }
  return previousClipedArea
}

export function getPersonalizedBbox(
  bbox: Feature<Polygon>,
  newInferiorLimit: number,
) {
  const bbox_teste: BBox = [
    bbox!.bbox![0],
    newInferiorLimit,
    bbox!.bbox![2],
    bbox!.bbox![3],
  ]
  const poly = bboxPolygon(bbox_teste)
  return poly
}

export function plotSections(
  map: { features: any },
  percentages: string | any[],
) {
  const bbox = getBbox(map?.features) // bbox original shape
  let bboxAuxiliary = getBbox(map?.features) // bbox auxiliary
  const clipedSections = []

  for (let i = 0; i < percentages?.length; i++) {
    const higherLimit = bboxAuxiliary?.geometry?.coordinates[0][2][1]
    const inferiorLimit = bboxAuxiliary?.geometry?.coordinates[0][1][1]
    // @ts-ignore
    clipedSections[i] = definePolyBasedPercentage(
      map,
      bboxAuxiliary as any,
      percentages[i],
      inferiorLimit,
      higherLimit,
    )
    bboxAuxiliary = getPersonalizedBbox(
      bbox,
      bboxAuxiliary?.geometry?.coordinates[0][2][1],
    ) // getBbox([clipedSections[0]]).bbox[3]
  }

  return clipedSections
}

type squareGridProps = {
  units?: Units;
  properties?: {};
  mask?:
    | Polygon
    | MultiPolygon
    | Feature<Polygon | MultiPolygon, { [name: string]: any }>;
};

export function plotGrid(bbox: any, km2: any, map: any) {
  const cellSide = km2
  //  var options = {units: 'kilometers', mask:map};
  const options: squareGridProps = {
    units: 'kilometers',
    properties: {},
    mask: map,
  }
  const squareGrid1 = squareGrid(bbox.bbox, cellSide, options)
  return squareGrid1
}

export function getCenters(featureCollection: any) {
  const centers = []
  for (let i = 0; i < featureCollection.length; i++) {
    // @ts-ignore
    centers[i] = centerOfMass(featureCollection[i])
  }
  return centers
}

export function colorInRange(
  objectLongitude: number,
  limit1: number,
  limit2: number,
) {
  return (
    (objectLongitude >= limit1 && objectLongitude <= limit2)
    || (objectLongitude >= limit2 && objectLongitude <= limit1)
  )
}

export function getLinesOnAxisXY(
  scaleFactor: number,
  bbox: Feature<Polygon, Properties>,
) {
  const limitTop = bbox.geometry.coordinates[0][2][1]
  const limitBottom = bbox.geometry.coordinates[0][0][1]
  const limitLeft = bbox.geometry.coordinates[0][0][0]
  const limitRight = bbox.geometry.coordinates[0][1][0]
  const spaceBetweenLinesX = getModuleInterval(
    limitTop,
    limitBottom,
    scaleFactor,
  )
  const spaceBetweenLinesY = getModuleInterval(
    limitLeft,
    limitRight,
    scaleFactor,
  )

  const linesOnAxisX = []
  const linesOnAxisY = []
  for (let i = 0; i <= scaleFactor; i++) {
    const positionY = limitBottom + spaceBetweenLinesX * i
    const positionX = limitLeft + spaceBetweenLinesY * i
    // @ts-ignore
    linesOnAxisX[i] = lineString([
      [limitLeft, positionY],
      [limitRight, positionY],
    ])
    // @ts-ignore
    linesOnAxisY[i] = lineString([
      [positionX, limitBottom],
      [positionX, limitTop],
    ])
  }

  return [linesOnAxisX, linesOnAxisY]
}

export function getGridPointsPerLines(
  scaleFactor: any,
  linesOnAxisX: any,
  linesOnAxisY: any,
) {
  const gridPointsPerLines = [[]]
  for (let k = 0; k <= scaleFactor; k++) {
    gridPointsPerLines[k] = []

    for (let l = 0; l <= scaleFactor; l++) {
      // @ts-ignore
      gridPointsPerLines[k][l] = lineIntersect(
        linesOnAxisX[k],
        linesOnAxisY[l],
      ).features[0]
    }
  }

  return gridPointsPerLines
}

export function getAllLines(gridPointsPerLines: any, polyMap: any) {
  const lines = [[]]
  let actualLineIndex = 0

  for (let i = 0; i <= gridPointsPerLines.length - 1; i++) {
    lines[actualLineIndex] = []

    let pastPointIsInMap = false

    for (let j = 0; j <= gridPointsPerLines[i].length - 1; j++) {
      const point = gridPointsPerLines[i][j]

      if (booleanWithin(point, polyMap)) {
        // actual point is in map ?
        // @ts-ignore
        lines[actualLineIndex].push(point)
        pastPointIsInMap = true
      } else if (pastPointIsInMap) {
        actualLineIndex += 1
        lines[actualLineIndex] = []
        pastPointIsInMap = false
      }
    }
  }

  return lines
}

export function getAllLineStrings(lines: any[]) {
  const lineStrings = []

  for (let i = 0; i <= lines.length - 1; i++) {
    if (lines[i].length > 0) {
      if (lines[i].length < 2) lines[i].push(lines[i][0])
      // @ts-ignore
      lineStrings[i] = lineString([
        [
          lines[i][0].geometry.coordinates[0],
          lines[i][0].geometry.coordinates[1],
        ],
        [
          lines[i][lines[i].length - 1].geometry.coordinates[0],
          lines[i][lines[i].length - 1].geometry.coordinates[1],
        ],
      ])
    }
  }

  return lineStrings
}

export function getModuleInterval(
  limit1: number,
  limit2: number,
  scaleFactor: number,
) {
  return Math.abs(
    (Math.abs(limit1) - Math.abs(limit2)) / Math.abs(scaleFactor),
  )
}
