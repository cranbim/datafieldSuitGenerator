// Data field suit generator
// Created by Dave Webb for Alyson Minkley
// more info on the Datafield project at https://alysonminkley.co.uk/#/data-field/
// Licenced under MIT license
// Build using P5.js
// Props to Dan Shiffman, Lauren McCarthy and the Processing Foundation


var qspec={
  title: "WELCOME TO THE DATAFIELD SURVEY",
  prompts: ["Datafield is a video artwork exploring the paradoxical relationship between our didactic education system and the overwhelming nature of virtual information systems which effects capacity & approach to decision making for Generation Z.",
"Participants in the project took a survey, the results of which defined the morphsuit-barchart costumes worn. To find out what your own morphsuit would look like please indicate how making decisions in the following areas makes you feel:"],
  end: "FIND OUT MORE ALYSONMINKLEY.CO.UK",
  questions:[
      {
        prompt:"Health, nutrition and fitness",
        responses:[
          { a: "Overwhelmed", val: 2 },
          { a: "Anxious", val: 1 },
          { a: "OK", val: 0 },
          { a: "Confident", val: -1 },
          { a: "Empowered", val: -2 },
          { a: "none", val: -9}
        ]
      },{
        prompt:"Education & training",
        responses:[
          { a: "Overwhelmed", val: 2 },
          { a: "Anxious", val: 1 },
          { a: "OK", val: 0 },
          { a: "Confident", val: -1 },
          { a: "Empowered", val: -2 },
          { a: "none", val: -9}
        ]
      },{
        prompt:"Careers",
        responses:[
          { a: "Overwhelmed", val: 2 },
          { a: "Anxious", val: 1 },
          { a: "OK", val: 0 },
          { a: "Confident", val: -1 },
          { a: "Empowered", val: -2 },
          { a: "none", val: -9}
        ]
      },{
        prompt:"Finance",
        responses:[
          { a: "Overwhelmed", val: 2 },
          { a: "Anxious", val: 1 },
          { a: "OK", val: 0 },
          { a: "Confident", val: -1 },
          { a: "Empowered", val: -2 },
          { a: "none", val: -9}
        ]
      },{
        prompt:"Living arrangements & accomodation",
        responses:[
          { a: "Overwhelmed", val: 2 },
          { a: "Anxious", val: 1 },
          { a: "OK", val: 0 },
          { a: "Confident", val: -1 },
          { a: "Empowered", val: -2 },
          { a: "none", val: -9}
        ]
      },{
        prompt:"Relationship & families",
        responses:[
          { a: "Overwhelmed", val: 2 },
          { a: "Anxious", val: 1 },
          { a: "OK", val: 0 },
          { a: "Confident", val: -1 },
          { a: "Empowered", val: -2 },
          { a: "none", val: -9}
        ]
      },{
        prompt:"Peers, friends & socialising",
        responses:[
          { a: "Overwhelmed", val: 2 },
          { a: "Anxious", val: 1 },
          { a: "OK", val: 0 },
          { a: "Confident", val: -1 },
          { a: "Empowered", val: -2 },
          { a: "none", val: -9}
        ]
      },{
        prompt:"Identity, style & body image",
        responses:[
          { a: "Overwhelmed", val: 2 },
          { a: "Anxious", val: 1 },
          { a: "OK", val: 0 },
          { a: "Confident", val: -1 },
          { a: "Empowered", val: -2 },
          { a: "none", val: -9}
        ]
      },{
        prompt:"Entertainment & hobbies",
        responses:[
          { a: "Overwhelmed", val: 2 },
          { a: "Anxious", val: 1 },
          { a: "OK", val: 0 },
          { a: "Confident", val: -1 },
          { a: "Empowered", val: -2 },
          { a: "none", val: -9}
        ]
      },{
        prompt:"Travel & culture",
        responses:[
          { a: "Overwhelmed", val: 2 },
          { a: "Anxious", val: 1 },
          { a: "OK", val: 0 },
          { a: "Confident", val: -1 },
          { a: "Empowered", val: -2 },
          { a: "none", val: -9}
        ]
      }
    ]
}

var suitColours=[
    "FF7AFF",
    "294A8B",
    "511684",
    "77C237",
    "FB0008",
    "A70005",
    "FC7309",
    "A8A8A8",
    "FFFF0C",
    "1295E9"
  ]

var canv;
var qdiv;
var questionnaire;

var data;
var maskImg;
var masked,masker;
var mw=400;
var mh=400;
var scl;

function preload(){
  maskImg=loadImage('morphFigure.png');
}


function setup() {
  qdiv=createDiv('');
  // qdiv.position(0,0,1);
  // qdiv.addClass('float');
  qdiv.addClass('front');
  createElement('br');
  canv=createCanvas(windowWidth, windowHeight);
  // canv.addClass('float');
  canv.position(0,0);
  clearDiv=createDiv('');
  clearDiv.addClass('clear');
  reset=createButton('reset');
  reset.mousePressed(resetQ);
  questionnaire=new Questionnaire(qdiv,qspec);
  reset.parent(qdiv);
  
  // canv.hide();
  var md=min(width, height);
  scl=md/mw;
  masker=createImage(mw,mh);
  data=new Data(mw,mh);
  // data.reset();
  data.update([0,0,0,0]);
  data.render();
  masked=data.get();
  masker.copy(maskImg,0,0,maskImg.width, maskImg.height,0,0,mw,mh);
  // masker.copy(maskImg,0,0,mw,mh,0,0,mw,mh);
  masked.mask(masker);
  background(128);
  translate(width/2, height/2);
  imageMode(CENTER);
  scale(scl);
  image(masked,0,0);
  frameRate(10);
  // noLoop();
  // draw();
}

function draw() {
  canv.position(0,floor(window.scrollY));
  var vals=questionnaire.getVals();
  // var cleanVals=[];
  // vals.forEach(function(v,i){
  //   vals[i]=constrain(v,0,2);
  // });
  // console.log(vals);
  var maxV=-99;
  var tot=vals.reduce(function(p,v){
    maxV=max(maxV,v);
    return p+(v>0?v:0);
  },0);
  // console.log(tot);
  // console.log("max:"+maxV);
  if(tot==0){
    vals.forEach(function(v,i){
      if(v==0) vals[i]=1;
    });
    var tot=vals.reduce(function(p,v){
    // maxV=max(maxV,v);
    return p+(v>0?v:0);
  },0);
  }
  var rels=[];
  vals.forEach(function(v,i){
    var ev=v<0?0:v;
    rels[i]=tot>0?ev/tot:0;
  });
  data.update(rels);
  data.render();
  masked=data.get();
  masker.copy(maskImg,0,0,maskImg.width, maskImg.height,0,0,mw,mh);
  // masker.copy(maskImg,0,0,mw,mh,0,0,mw,mh);
  masked.mask(masker);
  background(120);
  translate(width/2, height/2);
  imageMode(CENTER);
  scale(scl);
  image(masked,0,0);
  // console.log(rels,tot);
}

function resetQ(){
  questionnaire.reset();
}

function updateQ(){
  // draw();
    var vals=questionnaire.getVals();
  var tot=vals.reduce(function(p,v){
    return p+v;
  },0);
  var rels=[];
  vals.forEach(function(v,i){
    rels[i]=tot>0?v/tot:0;
  });
  data.update(rels);
  data.render();
  masked=data.get();
  masker.copy(maskImg,0,0,mw,mh,0,0,mw,mh);
  masked.mask(masker);
  // background(128);
  // translate(width/2, height/2);
  // imageMode(CENTER);
  // scale(scl);
  // image(masked,0,0);
  console.log(rels,tot);
  
}

function Questionnaire(div, spec){
  var questions=[];
  var title=createElement('h1',spec.title);
  title.parent(div);
  spec.prompts.forEach(function(prompt){
    var p=createP(prompt);
    p.parent(div);
  });
  spec.questions.forEach(function(q){
    var qp=createElement('h2',q.prompt);
    var qr=createRadio();
    qr.class('radio');
    // qr.mousePressed(updateQ);
    var options=[];
    q.responses.forEach(function(r,i){
      var op=qr.option(r.a, r.val);
      // console.log(op);
      // op.onclick = updateQ();
      options.push(op);
    });
    qr.value('-9');
    qp.parent(div);
    qr.parent(div);
    questions.push({prompt: qp, response: qr, options:options});
  });
  var end=createElement('h2',spec.end);
  end.parent(div);
  
  this.reset=function(){
    questions.forEach(function(q){
      q.options.forEach(function(qo){
        qo.checked=false;
      });
      q.response.value('-9');
    });
  }
  
  this.getVals=function(){
    var res=[];
    questions.forEach(function(q){
      var val=q.response.value();
      val=parseInt(val);
      res.push(isNaN(val)?0:val);
    });
    // console.log('vals');
    return res;
  }
}




function Data(w,h){
  var n;
  var vals=[0,0];
  var buff=createGraphics(w,h);
  
  this.update=function(newVals){
    vals=newVals.slice();
    // console.log(vals);
  };
  
  this.reset=function(){
    n=floor(random(2,6));
    var tot=0;
    for(var i=0; i<n; i++){
      var v=random(10);
      tot+=v;
      vals[i]=v;
    }
    // console.log(vals,tot);
    for(var i=0; i<n; i++){
      vals[i]/=tot;
    }
    // console.log(vals);
  };
  
  this.render=function(b){
    buff.clear();
    buff.colorMode(HSB);
    buff.noStroke();
    start=0;
    for(var i=0; i<vals.length; i++){
      // buff.fill(i*60,70,85);
      buff.fill("#"+suitColours[i]);
      buff.rect(0,(start)*buff.height,buff.width,vals[i]*buff.height);
      start+=vals[i];
    }
  };
  
  this.get=function(){
    return buff.get();
  };
  
  this.show=function(){
    colorMode(HSB);
    noStroke();
    start=0;
    for(var i=0; i<n; i++){
      fill(i*60,70,85);
      rect(0,(1-start)*height,width,-vals[i]*height);
      start+=vals[i];
    }
  };
}