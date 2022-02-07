// Grafica QQ plot o cuantil - cuantil
/** Sample from a normal distribution with mean 0, stddev 1. */
function normal_sample() {
    var x = 0, y = 0, rds, c;
    do {
      x = Math.random() * 2 - 1;
      y = Math.random() * 2 - 1;
      rds = x * x + y * y;
    } while (rds == 0 || rds > 1);
    c = Math.sqrt(-2 * Math.log(rds) / rds); // Box-Muller transform
    return x * c; // throw away extra sample y * c
  }
  
  // Uniform random distribution
  var uniform = function() { return Math.random(); };
  uniform.label = "Uniform Distribution";
  
  // Simple 1D Gaussian (normal) distribution
  var avg = pv.mean(turkers.percent.values);
  var dev = pv.deviation(turkers.percent.values);
  var normal1 = function() { return avg + dev * normal_sample(); }
  normal1.label = "Gaussian (Normal) Distribution";
  
  // Gaussian Mixture Model (k=3) fit using E-M algorithm
  var normal3 = function() {
    var dd = [
          [0.10306430789206111, 0.0036139086950272735, 0.30498647327844536],
          [0.5924252668569606, 0.0462763685758622, 0.4340870312025223],
          [0.9847627827855167, 2.352350767874714E-4, 0.2609264955190324]],
        r = Math.random(),
        i = r < dd[0][2] ? 0 : r < dd[0][2] + dd[1][2] ? 1 : 2,
        d = dd[i];
    return d[0] + Math.sqrt(d[1]) * normal_sample();
  }
  normal3.label = "Mixture of 3 Gaussians";
  
  /* Distributions for comparison. */
  var dists = [uniform, normal1, normal3];
  
  /* Compute quantiles of a distribution. */
  function quantile(n, values) {
    values = values.slice().sort(function(a, b) a - b);
    return pv.range(n).map(function(i) values[Math.floor(i * (values.length - 1) / n)]);
  }
  
  /* Lookup the value for an input quantile. */
  function qi(f, quantiles) {
    return quantiles[Math.round(f*(quantiles.length-1))];
  }
  
  /* Helpers for labeling 1st, 2nd, 3rd, etc. */
  var suffixMap = {1:"st", 2:"nd", 3:"rd"};
  var suffix = function(d) suffixMap[Math.floor(d) % 10] || "th";
  var percent = function(d) (100 * d).toFixed(0);
  
  /* Parameters and scales. */
  var w = 270,
      h = 270,
      p = 10,
      q2 = quantile(100, turkers.percent.values),
      x = pv.Scale.linear(-0.5, 1.5).range(0, w),
      y = pv.Scale.linear(-0.5, 1.5).range(0, h);
  
  /* The root panel. */
  var vis = new pv.Panel()
      .margin(5)
      .bottom(20)
      .left(50)
      .width((w + p) * dists.length - p)
      .height(h);
  
  /* The Q-Q plot panel. */
  var plot = vis.add(pv.Panel)
      .data(dists.map(function(d) quantile(100, pv.range(0, 10000).map(d))))
      .left(function() this.index * (w + p))
      .width(w)
      .strokeStyle("#ccc");
  
  /* Plot diagonal. */
  plot.add(pv.Line)
      .data([0, 1])
      .left(function(d) w * d)
      .bottom(function(d) h * d)
      .strokeStyle("#000")
      .lineWidth(1);
  
  /* Y-axis label. */
  vis.add(pv.Label)
      .data(["Turker Task Group Completion %"])
      .left(-35)
      .top(h / 2)
      .textAlign("center")
      .textAngle(-Math.PI / 2)
      .font("bold 11px sans-serif");
  
  /* X-axis ticks and labels. */
  plot.add(pv.Dot)
      .data(pv.range(0, 1.1, 0.5))
      .left(x)
      .bottom(-5)
      .size(5)
      .shape("tick")
      .strokeStyle("#999")
    .anchor("bottom").add(pv.Label)
      .text(percent);
  
  /* Y-axis ticks and labels. */
  plot.add(pv.Dot)
      .data(pv.range(0, 1.1, 0.5))
      .bottom(x)
      .left(-5)
      .size(5)
      .shape("tick")
      .angle(Math.PI/2)
      .strokeStyle("#999")
    .anchor("left").add(pv.Label)
      .visible(function() !this.parent.index)
      .text(percent);
  
  /* Data points by quantiles. */
  plot.add(pv.Dot)
      .data(pv.range(0.01, 1.0, 0.01))
      .left(function(f, q1) x(qi(f, q1)))
      .bottom(function(f) y(qi(f, q2)))
      .fillStyle(function() this.strokeStyle().alpha(.2))
      .title(function(f, q1) (100 * f).toFixed(0) + suffix(100 * f)
          + " Percentile: " + qi(f, q1).toFixed(2)
          + ", " + qi(f, q2).toFixed(2));
  
  /* Plot label. */
  plot.add(pv.Label)
      .textMargin(6)
      .textBaseline("top")
      .font("bold 10px sans-serif")
      .text(function() dists[this.parent.index].label);
  
  vis.render();
 
 
 
  var turkers = {
    percent: {
      minValue: 0.009259259,
      maxValue: 1,
      values: [
        0.009259259, 0.014285714, 0.014285714, 0.016666667,
        0.016666667, 0.017857143, 0.018518519, 0.027777778,
        0.028571429, 0.028571429, 0.028571429, 0.033333333,
        0.033333333, 0.035714286, 0.0375, 0.041666667,
        0.041666667, 0.041666667, 0.041666667, 0.042857143,
        0.042857143, 0.042857143, 0.05, 0.055555556,
        0.069444444, 0.083333333, 0.083333333, 0.083333333,
        0.083333333, 0.083333333, 0.083333333, 0.085714286,
        0.1, 0.1, 0.101851852, 0.104166667,
        0.111111111, 0.111111111, 0.114285714, 0.114285714,
        0.116666667, 0.12037037, 0.125, 0.125,
        0.128571429, 0.133333333, 0.138888889, 0.141666667,
        0.142857143, 0.142857143, 0.15, 0.152777778, 0.158333333,
        0.166666667, 0.171428571, 0.183333333, 0.185714286,
        0.185714286, 0.1875, 0.190140845, 0.194444444,
        0.2, 0.204545455, 0.208333333, 0.214285714,
        0.214285714, 0.253521127, 0.271428571, 0.277777778,
        0.291666667, 0.3, 0.3, 0.307017544,
        0.324074074, 0.328571429, 0.333333333, 0.333333333,
        0.342857143, 0.357142857, 0.358333333, 0.378787879,
        0.381355932, 0.395833333, 0.4, 0.414285714,
        0.414285714, 0.414285714, 0.414285714, 0.43,
        0.433333333, 0.4375, 0.445833333, 0.450704225,
        0.453333333, 0.458333333, 0.466666667, 0.476666667,
        0.494736842, 0.5, 0.516666667, 0.533333333,
        0.55, 0.557142857, 0.56884058, 0.569444444,
        0.571428571, 0.585714286, 0.61, 0.622222222,
        0.657407407, 0.666666667, 0.678947368, 0.685714286,
        0.685714286, 0.69047619, 0.7, 0.7,
        0.7, 0.711538462, 0.763888889, 0.771428571,
        0.788888889, 0.8, 0.8, 0.808333333,
        0.824712644, 0.828571429, 0.836842105, 0.839285714,
        0.839285714, 0.84, 0.842857143, 0.842857143,
        0.842857143, 0.85, 0.859649123, 0.869791667,
        0.871428571, 0.871428571, 0.892344498, 0.914285714,
        0.928571429, 0.933908046, 0.953703704, 0.973684211,
        0.975, 0.981481481, 0.983333333, 0.985714286,
        0.985714286, 0.985714286, 0.985714286, 0.985714286,
        0.985714286, 0.985714286, 0.985714286, 0.985714286,
        0.985714286, 0.985714286, 0.985714286, 0.985714286,
        0.985714286, 0.987096774, 0.990740741, 0.991666667,
        0.992, 0.994047619, 0.996666667, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
      ]
    }
  };