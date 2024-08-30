import { ZetkinArea } from 'features/areas/types';

export function GET() {
  const areas: ZetkinArea[] = [
    {
      id: 2,
      points: [
        [55.59361532349994, 12.977986335754396],
        [55.5914203134015, 12.97790050506592],
        [55.59045010406615, 12.977342605590822],
        [55.59007414150065, 12.979617118835451],
        [55.58915241158536, 12.983243465423586],
        [55.589698175333524, 12.983586788177492],
        [55.59359106991554, 12.983479499816896],
      ],
    },
    {
      id: 3,
      points: [
        [55.59353043588896, 12.97290086746216],
        [55.59151733301583, 12.971913814544678],
        [55.59047435959185, 12.977235317230225],
        [55.591396058460454, 12.977771759033205],
        [55.59357894311772, 12.977921962738039],
      ],
    },
    {
      id: 4,
      points: [
        [55.59355468951083, 12.983586788177492],
        [55.59353043588896, 12.987470626831056],
        [55.59174775363858, 12.98362970352173],
      ],
    },
  ];

  return Response.json({
    data: areas,
  });
}
