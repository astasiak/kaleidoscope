function setup() {
    w = windowWidth;
    h = windowHeight;
    sandboxw = 400;
    sandboxh = 400;
    framew = 120;
    frameh = framew * Math.sqrt(3) / 2;
    canvas = createCanvas(w, h);
    sandbox = createGraphics(sandboxw, sandboxh);
    buffer = createGraphics(framew, frameh);
    objects = [
      {
        draw: function(graphics) {
          graphics.fill(30, 30, 160, 50);
          graphics.arc(0, 0, 120, 120, PI, TWO_PI);
        },
        radius: 40
      },
      {
        draw: function(graphics) {
          graphics.fill(255, 100, 0, 150);
          graphics.circle(0, 0, 80);
        },
        radius: 0
      },
      {
        draw: function(graphics) {
          graphics.fill(0, 200, 0, 80);
          graphics.rect(0, 0, 80, 200);
        },
        radius: 80
      },
      {
        draw: function(graphics) {
          graphics.fill(255, 255, 200, 200);
          graphics.rect(0, 0, 30, 150);
        },
        radius: 80
      },
      {
        draw: function(graphics) {
          graphics.fill(0, 0, 255, 200);
          graphics.rect(0, 0, 20, 20);
        },
        radius: 100
      },
      {
        draw: function(graphics) {
          graphics.fill(255, 0, 0, 200);
          graphics.rect(0, 0, 20, 20);
        },
        radius: 100
      },
      {
        draw: function(graphics) {
          graphics.fill(0, 0, 0);
          graphics.circle(0, 0, 10);
        },
        radius: 100
      },
      {
        draw: function(graphics) {
          graphics.fill(0, 255, 180, 200);
          graphics.rect(0, 0, 5, 200);
        },
        radius: 100
      },
      {
        draw: function(graphics) {
          graphics.fill(255, 204, 0, 200);
          graphics.rect(0, 0, 5, 200);
        },
        radius: 100
      }
    ]
    for(o of objects) {
      o.x = map(random(), 0, 1, o.radius, sandboxw - o.radius);
      o.y = map(random(), 0, 1, o.radius, sandboxh - o.radius);
      o.vx = map(random(), 0, 1, -1, 1);
      o.vy = map(random(), 0, 1, -1, 1);
      o.r = map(random(), 0, 1, 0, PI);
      o.vr = map(random(), 0, 1, -0.01, 0.01);
    }
  }
  
  function draw() {
    sandbox.background(255);
   
    sandbox.rectMode(CENTER);
    for(o of objects) {
      sandbox.push();
      sandbox.translate(o.x, o.y);
      sandbox.rotate(o.r);
      o.draw(sandbox);
      sandbox.pop();
    }
    sandbox.fill(0);
    sandbox.noStroke();
    sandbox.rectMode(CENTER);
    //sandbox.rect(w / 2, h / 2, 200, 200);
    sandbox.rectMode(CORNER);
    sandbox.fill(100);
    //sandbox.rect(w / 2, h / 2, 100, 100);
    for(o of objects) {
      o.x += o.vx;
      o.y += o.vy;
      o.r += o.vr;
      if (o.x > sandboxw - o.radius) {
        o.vx = -o.vx;
      }
      if (o.y > sandboxh - o.radius) {
        o.vy = -o.vy;
      }
      if (o.x < o.radius) {
        o.vx = -o.vx;
      }
      if (o.y < o.radius) {
        o.vy = -o.vy;
      }
    }
    
    buffer.copy(sandbox, (sandboxw-framew) / 2, (sandboxh-frameh) / 2, framew, frameh, 0, 0, framew, frameh);
    angle = Math.atan(2*frameh/framew);
    size = framew + frameh;
    buffer.erase();
    buffer.push();
    buffer.rotate(angle);
    buffer.rect(0, 0, size, size);
    buffer.pop();
    buffer.push();
    buffer.translate(framew, 0);
    buffer.rotate(-angle);
    buffer.rect(-size, 0, size, size);
    buffer.pop();
    buffer.noErase();
    push();
    //translate(w, 0);
    for(j = 0; j* frameh < h; j++) {
      for(i = -Math.ceil(j / 2); (i + j / 2) * framew < w + framew; i++) {
        rotation = (i + 2 * j) % 3;
        push();
        translate((i + j / 2) * framew, j * frameh);
        push();
        translate(framew / 2, frameh / 3);
        rotate(rotation * 4 * PI / 3);
        copy(buffer, 0, 0, framew, frameh, - framew / 2, - frameh / 3, framew, frameh);
        pop();
        push();
        translate(0, 2 * frameh / 3);
        scale(1, -1);
        rotation += 1;
        rotate(rotation * 4 * PI / 3);
        copy(buffer, 0, 0, framew, frameh, - framew / 2, - frameh / 3, framew, frameh);
        pop();
        pop();
      }
    }
    pop();
    showSandbox = false;
    if (showSandbox) {
      copy(sandbox, 0, 0, sandboxw, sandboxh, 0, 0, sandboxw, sandboxh);
      push();
      translate(sandboxw / 2, sandboxh / 2);
      noFill();
      stroke(0);
      strokeWeight(2);
      triangle(-framew / 2, -frameh / 2, framew / 2, -frameh / 2, 0, frameh / 2);
      pop();
    }
  }

  function windowResized() {
    w = windowWidth;
    h = windowHeight;
    resizeCanvas(windowWidth, windowHeight);
  }
