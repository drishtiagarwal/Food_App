var scene, camera, renderer;

var WIDTH  = window.innerWidth;
var HEIGHT = window.innerHeight;

var SPEED = 0.01;

function myFunction()
{
	alert("The button was clicked.");
}
var first = -6;
var second = -3;
var third = 0;
var fourth = 3;
var fifth = 6;
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
    camera = new THREE.PerspectiveCamera(80, WIDTH / HEIGHT, 1, 10);
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
        if(x==first || x==fifth){
          mesh.scale.x = mesh.scale.y = mesh.scale.z = 0.25;
        }
        if(x==second || x==fourth){
          mesh.scale.x = mesh.scale.y = mesh.scale.z = 0.50;
        }
        if(x==third){
          mesh.scale.x = mesh.scale.y = mesh.scale.z = 0.75;
        }

        // mesh.translation = THREE.GeometryUtils.center(geometry);
        mesh.position.setX(x);
        mesh.position.setY(2);
        scene.add(mesh);
    });
}

function rotateMesh() {
    if (!mesh) {
        return;
    }

  //  mesh.rotation.x -= SPEED * 2;
    mesh.rotation.y -= SPEED;
  //  mesh.rotation.z -= SPEED * 3;
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

init(first,'container1');
render();
initMesh(second);
initMesh(third);
initMesh(fourth);
initMesh(fifth);
