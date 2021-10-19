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
  const limits = []

  for (let i = 0; i < cliped?.length; i++) {
    const sectionsBbox = []
    // @ts-ignore
    sectionsBbox[i] = getBbox([cliped[i]])
    limits[i] = [
    // @ts-ignore
      sectionsBbox[i]?.geometry?.coordinates[0][0][1],
      // @ts-ignore
      sectionsBbox[i]?.geometry?.coordinates[0][2][1],
    ]
  }

  return limits
}

export function calcularAreaOriginal(data: any[]) {
  const polygonSelected = polygon(data[0]?.geometry?.coordinates)
  const areaSelected = area(polygonSelected)
  return areaSelected
}

export function definePolyBasedPercentage(
  map: { features: any; },
  bboxAuxiliary: { bbox: number[]; geometry: { coordinates: number[][][]; }; },
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
    (bboxAuxiliary?.bbox as BBox),
  )

  for (let j = 0; j < 100; j++) {
    const aux = distribution[j]
    bboxAuxiliary!.bbox[3] = aux
    bboxAuxiliary!.geometry!.coordinates[0][2][1] = aux
    bboxAuxiliary!.geometry!.coordinates[0][3][1] = aux
    const cliped = bboxClip(map!.features[0]!.geometry, (bboxAuxiliary!.bbox as BBox))

    const clipedArea = calcularAreaOriginal([cliped])
    const clipedPercentualOfTotalArea = (clipedArea * 100) / totalArea

    if (clipedPercentualOfTotalArea >= targetPercentage) {
      previousClipedArea = cliped
      break
    } else previousClipedArea = cliped
  }
  return previousClipedArea
}

export function getPersonalizedBbox(bbox: Feature<Polygon>, newInferiorLimit: number) {
  const bbox_teste: BBox = [
      bbox!.bbox![0],
      newInferiorLimit,
      bbox!.bbox![2],
      bbox!.bbox![3],
  ]
  const poly = bboxPolygon(bbox_teste)
  return poly
}

export function plotSections(map: { features: any; }, percentages: string | any[]) {
  const bbox = getBbox(map?.features) // bbox original shape
  let bboxAuxiliary = getBbox(map?.features) // bbox auxiliary
  const clipedSections = []

  for (let i = 0; i < percentages?.length; i++) {
    const higherLimit = bboxAuxiliary?.geometry?.coordinates[0][2][1]
    const inferiorLimit = bboxAuxiliary?.geometry?.coordinates[0][1][1]
    // @ts-ignore
    clipedSections[i] = definePolyBasedPercentage(
      map,
      (bboxAuxiliary as any),
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
