var scene, camera, renderer;

var WIDTH  = window.innerWidth;
var HEIGHT = window.innerHeight;

var SPEED = 0.01;

function init(positionX,containerName) {
    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0xf0f0f0 );

    initMesh(positionX);
    initCamera();
    initLights();
    initRenderer();
    $(`#${containerName}`).append(renderer.domElement);
    //
    // document.body.appendChild(renderer.domElement);
}

function initCamera() {
    camera = new THREE.PerspectiveCamera(90, WIDTH / HEIGHT, 1, 10);
    camera.position.set(0, 3.5, 5);
    camera.lookAt(scene.position);
}


function initRenderer() {
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(WIDTH, HEIGHT);

}

function initLights() {
    var light = new THREE.AmbientLight(0xffffff);
    scene.add(light);
}

var mesh = null;
function initMesh(x) {
    var loader = new THREE.JSONLoader();
    loader.load('./testing.json', function(geometry, materials) {
        mesh = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial(materials));
        mesh.scale.x = mesh.scale.y = mesh.scale.z = 0.75;
        // mesh.translation = THREE.GeometryUtils.center(geometry);
        mesh.position.setX(x);
        scene.add(mesh);
    });
}

function rotateMesh() {
    if (!mesh) {
        return;
    }

    mesh.rotation.x -= SPEED * 2;
    mesh.rotation.y -= SPEED;
    mesh.rotation.z -= SPEED * 3;
}

function render() {
    requestAnimationFrame(render);
    for(var i=0;i<scene.children.length;i++)
    {
        if(scene.children[i].type==="Mesh")
        {
            mesh=scene.children[i];
            rotateMesh();
            scene.children[i]=mesh;
        }
    }
    renderer.render(scene, camera);

}

init(-8,'container1');
render();
initMesh(-5);
initMesh(-2);
initMesh(1);
initMesh(4);
initMesh(7);
initMesh(10);
initMesh(13);
