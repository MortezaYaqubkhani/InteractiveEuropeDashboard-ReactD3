import * as d3 from 'd3';
import { geoBonne } from 'd3-geo-projection';

export default function PathProjection(center, scale, box) {
  const myProj = geoBonne()
    .rotate([-20.0, 0.0])
    .center(center)
    .parallel(52)
    .scale(scale)
    .precision(0.1)
    .translate(box);

  return d3.geoPath().projection(myProj);
}
