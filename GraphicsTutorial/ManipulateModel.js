var renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('myCanvas'), antialias: true });
var mesh;
var camera;
var geometry;
var scene;
var material;
var colors = [0x0000FF, 0xA52A2A, 0x000080, 0x008000, 0x800080, 0x800000, 0x008080]; // blue, brown, dark blue, dark green, dark magneta, dark red, dark cyan
var currentColor = 0;
var loader;
var currentShapes = 0;
var shapesLength = 4;
var shapeString = ['cube', 'sphere', 'extrude', 'torus'];
var colorString = ['blue', 'brown', 'dark blue', 'dark green', 'dark magenta', 'dark red', 'dark cyan'];
var targetColor;
var targetShape;
var shapes = {
    Cube: function () {
        geometry = new THREE.BoxGeometry(100, 100, 100);
        material = new THREE.MeshLambertMaterial({ color: colors[currentColor] });
        mesh = new THREE.Mesh(geometry, material);
        setMeshPosition();
        addMeshToScene();
    },
    Sphere: function () {
        geometry = new THREE.SphereGeometry(80, 32, 32);
        material = new THREE.MeshLambertMaterial({ color: colors[currentColor] });
        mesh = new THREE.Mesh(geometry, material);
        setMeshPosition();
        addMeshToScene();
    },
    Extrude: function () {
        var length = 100, width = 150;
        var shape = new THREE.Shape();
        shape.moveTo(0, 0);
        shape.lineTo(0, width);
        shape.lineTo(length, width);
        shape.lineTo(length, 0);
        shape.lineTo(0, 0);

        var extrudeSettings = {
            steps: 5,
            depth: 96,
            bevelEnabled: true,
            bevelThickness: 1,
            bevelSize: 1,
            bevelSegments: 1
        };

        geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
        material = new THREE.MeshLambertMaterial({ color: colors[currentColor] });
        mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(-50, -90, -1000);
        addMeshToScene();
    },
    Torus: function () {
        geometry = new THREE.TorusGeometry(100, 40, 64, 100);
        material = new THREE.MeshLambertMaterial({ color: colors[currentColor] });
        mesh = new THREE.Mesh(geometry, material);
        setMeshPosition();
        addMeshToScene();
    }
};



function main() {

    renderer.setClearColor(0x00ffff, 1); ///cyan
    renderer.setPixelRatio(window.devicePizelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

    scene = new THREE.Scene();

    setTarget();
    camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 3000);

    var light = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(light);
    var light1 = new THREE.PointLight(0xffffff, 0.5);
    scene.add(light1);


    shapes.Cube();
   // shapes.Extrude();
    
    requestAnimationFrame(render);

    var timeLeft = 10;
    var downloadTimer = setInterval(function() {
        document.getElementById("progressBar").value = 10 - --timeLeft;
        if (timeLeft <= 0)
            clearInterval(downloadTimer);
    }, 1000);
    document.addEventListener("keydown", onDocumentKeyDown, false);
}

function onDocumentKeyDown(event) {
    check();
    var keyCode = event.which;
    if (keyCode == 37) { // left
        mesh.rotation.y -= 0.1;
    }
    else if (keyCode == 38) { // up
        mesh.rotation.x -= 0.1;
    }
    else if (keyCode == 39) { // right
        mesh.rotation.y += 0.1;
    }
    else if (keyCode == 40) { // down

        mesh.rotation.x += 0.1;
    }
    else if (keyCode == 32) {//space

        if (currentColor < (colors.length - 1)) {
            currentColor++;
        }

        else {
            currentColor = 0;
        }
        mesh.material.color.setHex(colors[currentColor]);
        
    }

    else if (keyCode == 83) { // tab
        if (currentShapes < (shapesLength - 1)) {
            currentShapes++;
        }
        else {
            currentShapes = 0;
        }
        //mesh.geometry.dispose();
        removeMeshFromScene();
        if (currentShapes == 0) {
            shapes.Cube();
        }
        else if (currentShapes == 1) {
            shapes.Sphere();
        }
        else if (currentShapes == 2) {
            shapes.Extrude();
        }
        else if (currentShapes == 3) {
            shapes.Torus();
        }
        
        requestAnimationFrame(render);
    }
    check();
}


function render() {
    
    renderer.render(scene, camera);
    requestAnimationFrame(render);
}

function setMeshPosition() {

    mesh.position.set(0, 0, -1000);
}
function addMeshToScene() {

    scene.add(mesh);
}
function removeMeshFromScene() {

    mesh.geometry.dispose();
    scene.remove(mesh);
}
function setTarget() {
    targetColor = colorString[4]; // magenta
    targetShape = shapeString[1]; // sphere
}
function check() {
    if ((targetColor == colorString[currentColor]) && (targetShape == shapeString[currentShapes])) {
        console.log("CORRECT OUTPUT");
    }
}
