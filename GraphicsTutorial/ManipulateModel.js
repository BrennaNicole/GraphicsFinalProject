var renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('myCanvas'), antialias: true });
var mesh;
var camera;
var geometry;
var scene;
var material;
var colors = [0x0000FF, 0xA52A2A, 0x000080, 0x008000, 0x800080, 0x800000, 0x008080]; // blue, brown, dark blue, dark green, dark magneta, dark red, dark cyan
var currentColor = 0;
var loader;
function main() {

    renderer.setClearColor(0x00ffff, 1); ///cyan
    renderer.setPixelRatio(window.devicePizelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

   /* loader = new THREE.FontLoader();
    leader.load('/examples/fonts/helvetiker_regular.typeface.json', function (font) {
        var textGeometry = new Three.TextGeometry('Click SPACE to change model color', {
            font: font,
            size: 20,
            height: 5,
            curveSegments: 12,
            bevelEnabled: false,
        });
    });*/
    scene = new THREE.Scene();


    camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 3000);

    var light = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(light);
    var light1 = new THREE.PointLight(0xffffff, 0.5);
    scene.add(light1);

    geometry = new THREE.BoxGeometry(100, 100, 100);
    material = new THREE.MeshLambertMaterial({ color: colors[currentColor]});
    mesh = new THREE.Mesh(geometry, material);


    mesh.position.set(0, 0, -1000);
    scene.add(mesh);

    requestAnimationFrame(render);

    document.addEventListener("keydown", onDocumentKeyDown, false);
}

function onDocumentKeyDown(event) {
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
    else if (keyCode == 32) {

        if (currentColor < (colors.length - 1)) {
            currentColor++;
        }

        else {
            currentColor = 0;
        }
        mesh.material.color.setHex(colors[currentColor]);
    }
}


function render() {
    
    renderer.render(scene, camera);
    requestAnimationFrame(render);
}

function Cube(mesh) {
}

//document.body.appendChild(renderer.domElement);