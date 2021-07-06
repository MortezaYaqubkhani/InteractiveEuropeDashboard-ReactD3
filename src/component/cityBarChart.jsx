import React from 'react';
import {useEffect} from 'react';
import {Component, createRef, useRef} from 'react';
import * as d3 from 'd3';

const CityBarChart = () => {
  const svgRef = useRef();

  let chartType = '';

  function changeBtn(Event) {
    // console.log(Event);
    if (Event.target.value == 'PIE') {
      console.log(2323);
      chartType = 'pie';
    } else if (Event.target.value == 'BAR') {
      chartType = 'bar';
    }
  }
  // console.log(sc)
  useEffect(() => {
    function SproutChart(target, options) {
      'use strict';
      var sc = this;
      console.log(chartType);

      options = Array.isArray(options)
        ? {
            data: options,
          }
        : options || {};

      sc.data = options.data || [
        {name: 'Kevin', value: 8},
        {name: 'Bob', value: 8},
        {name: 'Stuart', value: 3},
        {name: 'Gru', value: 5},
      ];
      sc.size = options.size || 250; // svg container size, idealy equals to twice of rHover + max(spaceHover, spaceActive)
      sc.duration = options.duration || 1000; // transition duration of the first time draw the pie chart
      sc.easing = options.easing || 'cubic-in-out'; // transition easing function, same as d3 easing
      sc.materialColor = [
        '#f44336',
        ' #e91e63',
        '#9c27b0',
        '#673ab7',
        '#3f51b5',
        '#2196f3',
        '#03a9f4',
        '#00bcd4',
        '#009688',
        '#4caf50',
        '#8bc34a',
        '#cddc39',
        '#ffeb3b',
        '#ffc107',
        '#ff9800',
        '#ff5722',
        '#795548',
        '#9e9e9e',
        '#607d8b',
      ];
      //this part actually each time creates a new array of colors randomly from the original array
      var ri = Math.floor(Math.random() * sc.materialColor.length);
      sc.materialColor = sc.materialColor
        .slice(ri)
        .concat(sc.materialColor.slice(0, ri));

      // create the svg container
      sc.svg = d3
        .select(target)
        .append('svg')
        .attr('width', this.size)
        .attr('height', this.size);

      console.log(sc);
      console.log(sc.svg);

      return sc;
    }
    // console.log(SproutChart)
    //the rest
    // SproutChart.prototype.pieChart = function (options) {
    //   var sc = this;
    //   sc.type = 'pie';

    //   options = options || {};

    //   var r = options.r || 150, // radius of pie chart
    //     innerRadius = options.innerRadius || 80, // the radius of the donut pie inner space
    //     rHover = options.rHover || 160, // radius of pie chart when hover
    //     spaceHover = options.spaceHover || 10, // the space pie pop out when hover
    //     spaceActive = options.spaceActive || 20, // the space pie pop out when active
    //     showOnStart =
    //       options.showOnStart !== undefined ? options.showOnStart : true; // call transitionForward() on start

    //   //   function to draw arc
    //   var drawArc = function (startAngle, endAngle, outerRadius) {
    //     return d3
    //       .arc()
    //       .startAngle(startAngle)
    //       .endAngle(endAngle)
    //       .innerRadius(innerRadius)
    //       .outerRadius(outerRadius || r);
    //   };
    //   //   map data to arc function
    //   var sum = sc.data
    //     .map(function (d) {
    //       return d.value;
    //     })
    //     .reduce(function (prev, cur) {
    //       return prev + cur;
    //     });

    //   var accumulate = 0;
    //   sc.data = sc.data.map(function (d, i) {
    //     return {
    //       name: d.name,
    //       value: d.value,
    //       color: d.color || sc.materialColor[i],
    //       arc: drawArc(
    //         accumulate,
    //         (accumulate += (d.value / sum) * 2 * Math.PI)
    //       ),
    //     };
    //   });

    //   var g = sc.svg
    //     .append('g')
    //     .attr(
    //       'transform',
    //       'translate(' + sc.size / 2 + ', ' + sc.size / 2 + ')'
    //     );

    //   //get information from data
    //   sc.data.forEach(function (d) {
    //     d.value = +d.value; // calculate count as we iterate through the data
    //     d.enabled = true; // add enabled property to track which entries are checked
    //   });

    //   // draw for each pie
    //   var pie = g
    //     .selectAll('path')
    //     .data(sc.data)
    //     .enter()
    //     .append('path')
    //     .attr('d', function (d) {
    //       return drawArc(d.arc.startAngle()(), d.arc.endAngle()())();
    //     })
    //     .style('fill', function (d) {
    //       return d.color;
    //     })

    //     .style('clip-path', 'url(#clipMask)');

    //   //mouse activity, mouse over
    //   pie.on('mouseover', function (i, d) {
    //     if (!d.active) {
    //       //to elaborate the pie section
    //       tooltip.style('visibility', 'visible').text();

    //       d3.select(this)
    //         .transition()
    //         .duration(200)
    //         .ease(d3.easeCubicOut)
    //         .attr('d', function (d) {
    //           return drawArc(
    //             d.arc.startAngle()(),
    //             d.arc.endAngle()(),
    //             r + 20
    //           )();
    //         })
    //         .attr('transform', function (d) {
    //           var distance = Math.sqrt(
    //             Math.pow(d.arc.centroid()[0], 2) +
    //               Math.pow(d.arc.centroid()[1], 2)
    //           );
    //           var n = spaceHover / distance;
    //           return (
    //             'translate(' +
    //             n * d.arc.centroid()[0] +
    //             ',' +
    //             n * d.arc.centroid()[1] +
    //             ')'
    //           );
    //         });

    //       //to show the percentage number
    //       g.select('text.percent')
    //         .transition()
    //         .duration(500)
    //         .ease(d3.easeCubicOut)
    //         .attr('opacity', 1)
    //         .tween('text', function () {
    //           console.log(d);
    //           var j = d3.interpolate(
    //             0,
    //             Math.round(
    //               ((d.arc.endAngle()() - d.arc.startAngle()()) / 2 / Math.PI) *
    //                 100
    //             )
    //           );
    //           return function (t) {
    //             // console.log(t)
    //             this.textContent = Math.round(j(t)) + '%';
    //           };
    //         });
    //     }
    //   });

    //   //mouse activity, click
    //   pie.on('click', function (i, d) {
    //     if (!d.active) {
    //       d3.select(this)
    //         .transition()
    //         .duration(200)
    //         .ease(d3.easeBounce)
    //         .attr('d', function () {
    //           return drawArc(
    //             d.arc.startAngle()(),
    //             d.arc.endAngle()(),
    //             r + 40
    //           )();
    //         })
    //         .attr('transform', function (d) {
    //           var distance = Math.sqrt(
    //             Math.pow(d.arc.centroid()[0], 2) +
    //               Math.pow(d.arc.centroid()[1], 2)
    //           );
    //           var n = spaceActive / distance;
    //           return (
    //             'translate(' +
    //             n * d.arc.centroid()[0] +
    //             ',' +
    //             n * d.arc.centroid()[1] +
    //             ')'
    //           );
    //         });
    //     }
    //     d.active = !d.active;
    //   });

    //   //mouse movement, mouse move
    //   pie.on('mousemove', function (i, d) {
    //     // console.log(i)
    //     tooltip
    //       .style('top', i.clientY - 10 + 'px')
    //       .style('left', i.clientX + 10 + 'px')
    //       .text(d.name);
    //   });

    //   //mouse movement, mouse out
    //   pie.on('mouseout', function (i, d) {
    //     //to finish the tooltip
    //     tooltip.style('visibility', 'hidden');

    //     if (!d.active) {
    //       d3.select(this)
    //         .transition()
    //         .duration(200)
    //         .ease(d3.easeCubicOut)
    //         .attr('d', function () {
    //           return drawArc(d.arc.startAngle()(), d.arc.endAngle()())();
    //         })
    //         .attr('transform', 'translate(0, 0)');

    //       g.select('text.percent')
    //         .transition()
    //         .duration(500)
    //         .ease(d3.easeCubicOut)
    //         .attr('opacity', 0);
    //     }
    //     //maybe I can erase these two lines
    //     g.select('rect').style('display', 'none');
    //     g.select('text').text('');
    //   });

    //   // start transition animation clip path
    //   var clipPath = g
    //     .append('defs')
    //     .append('clipPath')
    //     .attr('id', 'clipMask')
    //     .append('path')
    //     .attr('d', function () {
    //       return drawArc(0, 10 / r, r + 20)();
    //     });

    //   // hover text background
    //   var textWrapper = g
    //     .append('rect')
    //     .style('fill', d3.rgb(0, 0, 0))
    //     .style('opacity', 0.7)
    //     .style('display', 'none');
    //   // hover text
    //   var nameText = g
    //     .append('text')
    //     .attr('class', 'name')
    //     .style('fill', d3.rgb(255, 255, 255))
    //     .attr('font-family', 'Montserrat')
    //     .attr('text-anchor', 'middle');

    //   var percentText = g
    //     .append('text')
    //     .attr('x', 0)
    //     .attr('y', 18)
    //     .attr('text-anchor', 'middle')
    //     .attr('font-size', 50)
    //     .attr('font-family', 'Montserrat')
    //     .attr('class', 'percent')
    //     .style('fill', d3.rgb(0, 0, 0));

    //   sc.transitionBack = function (callback, options) {
    //     clipPath
    //       .transition()
    //       .duration(sc.duration)
    //       .ease(d3.easeCubicOut)
    //       .attrTween('d', function () {
    //         var i = d3.interpolate(2 * Math.PI, 10 / r);

    //         return function (t) {
    //           return drawArc(0, i(t), r + 20)();
    //         };
    //       })
    //       .on('end', callback);

    //     return sc;
    //   };

    //   sc.transitionForward = function (callback) {
    //     clipPath
    //       .transition()
    //       .duration(sc.duration)
    //       .ease(d3.easeCubicOut)
    //       .attrTween('d', function () {
    //         var i = d3.interpolate(10 / r, 2 * Math.PI);

    //         return function (t) {
    //           return drawArc(0, i(t), r + 20)();
    //         };
    //       })
    //       .on('end', callback);

    //     return sc;
    //   };

    //   if (showOnStart) sc.transitionForward();

    //   return sc;
    // };

    // create bar chart
    SproutChart.prototype.barChart = function (options) {
      var sc = this;

      sc.type = 'bar';

      options = options || {};

      var barHeight = options.barHeight || 30,
        gap = options.gap || 0,
        padding = options.padding || 50,
        showOnStart =
          options.showOnStart !== undefined ? options.showOnStart : true, // call transitionForward() on start
        max;

      sc.data = sc.data.map(function (d, i) {
        max = max ? (d.value > max ? d.value : max) : d.value;

        return {
          name: d.name,
          value: d.value,
          color: d.color || sc.materialColor[i],
        };
      });
      // console.log(sc);
      var ratio = options.ratio || (sc.size - padding * 2) / max;

      // create the svg container
      var g = sc.svg.append('g').attr('class', 'bar');

      g.attr('transform', function () {
        // console.log(sc);
        var y = (sc.size - sc.data.length * (barHeight + gap) - gap) / 2;

        return 'translate(' + padding + ', ' + y + ')';
      });

      var bar = g
        .selectAll('rect')
        .data(sc.data)
        .enter()
        .append('rect')
        .attr('x', 0)
        .attr('y', function (d, i) {
          return i * (barHeight + gap);
        })
        .attr('height', barHeight)
        .attr('width', function (d) {
          return 2 * d.value;
        })
        .style('fill', function (d) {
          return d.color;
        })

        .style('clip-path', 'url(#clipMask)');

      var barValue = g
        .selectAll('text')
        .data(sc.data)
        .enter()
        .append('text')
        .attr('class', 'bar-value')
        .attr('x', function (d) {
          return 2 * d.value + 5;
        })
        .attr('y', function (d, i) {
          return i * (barHeight + gap) + barHeight * 0.7;
        })
        .attr('opacity', 1)
        .attr('font-size', barHeight * 0.7)
        .attr('font-family', 'Montserrat')
        .attr('text-anchor', 'start')
        .text(function (d) {
          return d.value;
        });

      bar.on('mousemove', function (i, d) {
        tooltipa
          .style('top', i.clientY - 10 + 'px')
          .style('left', i.clientX + 10 + 'px')
          .text(d.name);
        tooltipa.style('visibility', 'visible').text();
      });

      bar.on('mouseout', function (d) {
        tooltipa.style('visibility', 'hidden');
      });

      const r = 150;
      const innerRadius = 80;

      var drawArc = function (startAngle, endAngle, outerRadius) {
        return d3
          .arc()
          .startAngle(startAngle)
          .endAngle(endAngle)
          .innerRadius(innerRadius)
          .outerRadius(outerRadius || r);
      };

      // var clipPath = g
      //   .append('defs')
      //   .append('clipPath')
      //   .attr('id', 'clipMask')
      //   .append('path')
      //   .attr('d', function () {
      //     return drawArc(0, 10 / r, r + 20)();
      //   });
      var clipPath = g
        .append('defs')
        .append('clipPath')
        .attr('id', 'clipMask')
        .append('rect')
        .attr('x', 0)
        .attr('y', 0)
        .attr('height', barHeight)
        .attr('width', sc.size);

      sc.transitionForward = function (callback) {
        bar
          .transition()
          .duration(sc.duration / 1)
          .ease(d3.easeCubicOut)
          .delay(function (d, i) {
            return (i * (sc.duration / 2)) / sc.data.length;
          })
          .attr('width', function (d) {
            return d.value * ratio;
          })
          .on('end', function (d, i) {
            // console.log(i, d);
            if (i === sc.data.length - 1 && typeof callback === 'function')
              callback();
          });

        barValue
          .transition()
          .duration(sc.duration / 2)
          .ease(d3.easeCubicOut)
          .delay(function (d, i) {
            return i * (sc.duration / 2 / sc.data.length);
          })
          .attr('x', function (d) {
            return d.value * ratio + barHeight * 0.3;
          })
          .attr('opacity', 1)
          .tween('text', function (d) {
            // console.log(d);
            var i = d3.interpolate(0, d.value);

            return function (t) {
              this.textContent = Math.round(i(t));
            };
          })
          .style('fill', 'rgb(255,255,255)');

        clipPath
          .transition()
          .duration((sc.duration * (sc.data.length - 1)) / sc.data.length)
          .ease(d3.easeCubicOut)
          .attr('height', sc.size);

        return sc;
      };

      sc.transitionBack = function (callback) {
        bar
          .transition()
          .duration(sc.duration / 2)
          .ease(sc.easing)
          .delay(function (d, i) {
            return (
              (sc.data.length - i - 1) * (sc.duration / 2 / sc.data.length)
            );
          })
          .attr('width', 10)
          .each('end', function (d, i) {
            if (i === 0 && typeof callback === 'function') callback();
          });

        barValue
          .transition()
          .duration(sc.duration / 2)
          .ease(sc.easing)
          .delay(function (d, i) {
            return (
              (sc.data.length - i - 1) * (sc.duration / 2 / sc.data.length)
            );
          })
          .attr('x', barHeight * 0.3)
          .attr('opacity', 0)
          .tween('text', function (d) {
            var i = d3.interpolate(d.value, 0);

            return function (t) {
              this.textContent = Math.round(i(t));
            };
          });

        clipPath
          .transition()
          .duration((sc.duration * (sc.data.length - 1)) / sc.data.length)
          .ease(sc.easing)
          .attr('height', barHeight);
        return sc;
      };

      // hover text background
      var textWrapper = g
        .append('rect')
        .attr('class', 'nameBackground')
        .style('fill', d3.rgb(0, 0, 0))
        .style('opacity', 0.7)
        .style('display', 'none');
      // hover text
      var nameText = g
        .append('text')
        .attr('class', 'name')
        .style('fill', d3.rgb(255, 255, 255))
        .attr('font-family', 'Montserrat')
        .attr('text-anchor', 'middle');

      if (showOnStart)
        // console.log(sc.transitionForward());
        sc.transitionForward();

      return sc;
    };

    // inject to target DOM
    var chart = new SproutChart(svgRef.current, [
      {
        name: 'Hotel',
        value: 10,
      },
      {
        name: 'High-Education',
        value: 3,
      },
      {
        name: 'Factory',
        value: 9,
      },
      {
        name: 'Muesum',
        value: 5,
      },
      {
        name: 'Bank',
        value: 8,
      },
      {
        name: 'School',
        value: 19,
      },
    ]);

    const options = {
      r: 80,
      innerRadius: 50,
      rHover: 120,
    };

    const tooltip = d3
      .select('body')
      .append('div')
      .style('position', 'absolute')
      .style('font-family', "'Open Sans', sans-serif")
      .style('font-size', '15px')
      .style('z-index', '10')
      .style('background-color', 'rgb(0, 0, 0)')
      .style('opacity', 0.8)
      .style('color', 'rgb(255, 255, 255)')
      .style('border', 'solid')
      .style('border-color', 'rgb(255, 255, 255)')
      .style('padding', '5px')
      .style('border-radius', '2px')
      .style('visibility', 'hidden');

    const tooltipa = d3
      .select('body')
      .append('div')
      .style('position', 'absolute')
      .style('font-family', "'Open Sans', sans-serif")
      .style('font-size', '15px')
      .style('z-index', '10')
      .style('background-color', 'rgb(0, 0, 0)')
      .style('opacity', 0.8)
      .style('color', 'rgb(255, 255, 255)')
      .style('border', 'solid')
      .style('border-color', 'rgb(255, 255, 255)')
      .style('padding', '5px')
      .style('border-radius', '2px')
      .style('visibility', 'hidden');

    chart.barChart(options);
  }, [chartType]);
  return (
    // <div className="center">
    <div id="container" ref={svgRef}></div>
  );
};

export default CityBarChart;
