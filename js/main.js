var scene, camera, renderer;

var WIDTH  = window.innerWidth;
var HEIGHT = window.innerHeight;

var SPEED = 0.01;

function myFunction()
{
	alert("The button was clicked.");
}
// var first = -6;
// var second = -3;
// var third = 0;
// var fourth = 3;
// var fifth = 6;
var meshPositions=[-6,-3,0,3,6];
function init(positionX,containerName) {
    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0xf0f0f0 );

    initMesh(positionX,0);
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
function initMesh(x,i) {
    var loader = new THREE.JSONLoader();
	  if(x==meshPositions[0]){
			loader.load('./testing.json', function(geometry, materials){
				mesh = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial(materials));
				mesh.scale.x = mesh.scale.y = mesh.scale.z = 0.25;
				mesh.position.setX(x);
				mesh.position.setY(2);
				initDOM(i);
				scene.add(mesh);
			});
		}
		if(x==meshPositions[1]){
			loader.load('./testingTwo.json', function(geometry, materials){
				mesh = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial(materials));
				mesh.scale.x = mesh.scale.y = mesh.scale.z = 0.50;
				mesh.position.setX(x);
				mesh.position.setY(2);
				initDOM(i);
				scene.add(mesh);
			});
		}
		if(x==meshPositions[2]){
			loader.load('./testingThree.json', function(geometry, materials){
				mesh = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial(materials));
				mesh.scale.x = mesh.scale.y = mesh.scale.z = 0.75;
				mesh.position.setX(x);
				mesh.position.setY(2);
				initDOM(i);
				scene.add(mesh);
			});
		}
		if(x==meshPositions[3]){
			loader.load('./testingFour.json', function(geometry, materials){
				mesh = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial(materials));
				mesh.scale.x = mesh.scale.y = mesh.scale.z = 0.50;
				mesh.position.setX(x);
				mesh.position.setY(2);
				initDOM(i);
				scene.add(mesh);
			});
		}
		if(x==meshPositions[4]){
			loader.load('./testingFive.json', function(geometry, materials){
				mesh = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial(materials));
				mesh.scale.x = mesh.scale.y = mesh.scale.z = 0.25;
				mesh.position.setX(x);
				mesh.position.setY(2);
				initDOM(i);
				scene.add(mesh);
			});
		}
        // mesh.translation = THREE.GeometryUtils.center(geometry);

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


function initDOM(meshNo){
    var domElements=new THREEx.DomEvents(camera,renderer.domElement);
    domElements.addEventListener(mesh,'click',function () {
        // alert("You clicked a mesh");
        console.log("You clicked a mesh");
        scene.children[meshNo+1].position.setX(meshPositions[2]);
        scene.children[meshNo+1].scale.x=scene.children[meshNo+1].scale.y=scene.children[meshNo+1].scale.z=0.75;
        var j=-3
        for(var i=meshNo-1;i>=0;i--)
        {
            scene.children[i+1].position.setX(j);
						if(j==meshPositions[0] || j==meshPositions[4]){
		          scene.children[i+1].scale.x=scene.children[i+1].scale.y=scene.children[i+1].scale.z=0.25;
		        }
		        if(j==meshPositions[1] || j==meshPositions[3]){
		          scene.children[i+1].scale.x=scene.children[i+1].scale.y=scene.children[i+1].scale.z=0.50;
		        }
		        if(j==meshPositions[2]){
		          scene.children[i+1].scale.x=scene.children[i+1].scale.y=scene.children[i+1].scale.z=0.75;
		        }
            console.log(i+" "+j);
            j-=3;
        }
        j=3;
        for(var i=meshNo+1;i<scene.children.length-1;i++)
        {
            scene.children[i+1].position.setX(j);
						if(j==meshPositions[0] || j==meshPositions[4]){
		          scene.children[i+1].scale.x=scene.children[i+1].scale.y=scene.children[i+1].scale.z=0.25;
		        }
		        if(j==meshPositions[1] || j==meshPositions[3]){
		          scene.children[i+1].scale.x=scene.children[i+1].scale.y=scene.children[i+1].scale.z=0.50;
		        }
		        if(j==meshPositions[2]){
		          scene.children[i+1].scale.x=scene.children[i+1].scale.y=scene.children[i+1].scale.z=0.75;
		        }

            console.log(i+" "+j);
            j+=3;
        }
    })
}


init(meshPositions[0],'container1');
for(var i=1;i<meshPositions.length;i++)
{
    initMesh(meshPositions[i],i);
}
render();
