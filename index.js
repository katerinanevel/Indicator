function Indicator(elem, options) {

  extend(this, options);

  this.elem = elem;

  this.elem.innerHTML = ['<svg class="indicator-inner" version="1.1" xmlns="http://www.w3.org/2000/svg">',
    '<circle class="indicator-circle" fill="transparent" stroke="grey" opacity="0.1" clip-path="url(#cut-off-bottom)"/>',
    '<defs><clipPath id="cut-off-bottom"><circle class="clipping-circle"></circle></clipPath></defs>',
    '<path class="indicator-arc" fill="transparent"></path>',
    '</svg>',
    '<div class="indicator-number">',
    '<span class="indicator-number-inner"></span>',
    '</div>'
  ].join('');

  this.indicatorInn = this.elem.querySelector('.indicator-inner');
  this.indicatorCirc = this.elem.querySelector('.indicator-circle');
  this.clippingCirc = this.elem.querySelector('.clipping-circle');
  this.indicatorArc = this.elem.querySelector('.indicator-arc');
  this.indicatorNum = this.elem.querySelector('.indicator-number');
  this.indicatorNumIn = this.elem.querySelector('.indicator-number-inner');
  
  setCircAtt(this.elem.clientHeight/2, this.indicatorCirc);
  setCircAtt(this.elem.clientHeight/2, this.clippingCirc);
  this.indicatorCirc.setAttribute('stroke-width', this.width*2);
  this.indicatorNumIn.innerHTML = this.percent;
  this.setPercent(this.percent);

}
//defaults
Indicator.prototype.percent = 30;
Indicator.prototype.startDegree = 50;
Indicator.prototype.anticlockwise = 1;
Indicator.prototype.color = 'red';
Indicator.prototype.width = '20';


Indicator.prototype.setPercent = function(p) {
  var degrees = p / 100 * 360;
  var endDegree;
  var radius = this.elem.clientHeight / 2;

  if (this.anticlockwise) {
     endDegree = this.startDegree - degrees;
  } else {
     endDegree = this.startDegree + degrees;
  }
  
  var coordsStart = findCoords(this.startDegree, radius);
  var coordsEnd = findCoords(endDegree, radius);
  var reverse = this.startDegree > endDegree;

  var d = 'M' + coordsStart + ' ' + 'A' + radius + ' ' + radius + ' 0 ' + ' ' + (Math.abs(this.startDegree - endDegree) > 180 ? 1 : 0) + ' ' + (reverse ? 0 : 1) + ' ' + coordsEnd;

  this.indicatorArc.setAttribute('d', d);
  this.indicatorArc.setAttribute('clip-path', 'url(#cut-off-bottom)');
  this.indicatorArc.setAttribute('stroke', this.color);
  this.indicatorArc.setAttribute('stroke-width', this.width*2);
}


function setCircAtt(radius, circle) {
  circle.setAttribute('cx', radius);
  circle.setAttribute('cy', radius);
  circle.setAttribute('r', radius);
}

function findCoords(degrees, radius) {
  var radians = degrees * (Math.PI / 180);
  return [
    radius + Math.cos(radians) * radius,
    radius + Math.sin(radians) * radius
  ]
}

function extend(target, source) {
  target = target || {};
  for (var prop in source) {
    if (typeof source[prop] === 'object') {
      target[prop] = this.extend(target[prop], source[prop]);
    } else {
      target[prop] = source[prop];
    }
  }
  return target;
}
