#pragma strict

function Start () {
	Cursor.visible = false;
}
var thisTime : float = 0;
var cubein : float = 2;
var subtractnow : float = 0;

function Update () {

	var spectrum = AudioListener.GetSpectrumData(1024,0,FFTWindow.Hamming);

    var j: int;
	var sum: float = 0;
	var sum2: float = 0;
	var sum3: float = 0;
	var sum4: float = 0;

	for (j=0; j < 1023; j++){ // find max 

		if (j < 100){
			sum = sum + spectrum[j];
		}
		if (j > 100 && j < 400) {
			sum2 = sum2 + spectrum[j];
		}
		if (j > 400 && j < 800) {
			sum3 = sum3 + spectrum[j];
		}
		if (j > 800) {
			sum4 = sum4 + spectrum[j];
		}		
	}

	/*
	c1 = 64hz
	c2 = 256hz
	c3 = 512hz
	c4 = 1024hz
	*/
	
/*	var Cube1 : float = spectrum[3] + spectrum[2] + spectrum[4];
	var Cube2 : float = spectrum[11] + spectrum[12] + spectrum[13];
	var Cube3 : float = spectrum[22] + spectrum[23] + spectrum[24];
	var Cube4 : float = spectrum[44] + spectrum[45] + spectrum[46] + spectrum[47] + spectrum[48] + spectrum[49];
*/
	var Cube1 : float = sum;
	var Cube2 : float = sum2;
	var Cube3 : float = sum3;
	var Cube4 : float = sum4;


	var AniBean : GameObject[] = GameObject.FindGameObjectsWithTag("AniBean");
	var AniBean2 : GameObject[] = GameObject.FindGameObjectsWithTag("AniBean2");
	var AniTarg : GameObject[] = GameObject.FindGameObjectsWithTag("AniTarg");
	var Cubert : GameObject[] = GameObject.FindGameObjectsWithTag("Cubert");
	var Treebert : GameObject[] = GameObject.FindGameObjectsWithTag("Treebert");
	var Spin1bert : GameObject[] = GameObject.FindGameObjectsWithTag("Spin1bert");
	var Spin2bert : GameObject[] = GameObject.FindGameObjectsWithTag("Spin2bert");
	var Spin3bert : GameObject[] = GameObject.FindGameObjectsWithTag("Spin3bert");
	var Spin4bert : GameObject[] = GameObject.FindGameObjectsWithTag("Spin4bert");
	
	for(var i = 0; i < Cubert.length; i++) {
		switch(Cubert[i].name) {
			case 'Cube1': Cubert[i].transform.localScale.y = Cube1;

/*			Debug.Log("Array print" + thisTime);			*/
/*			if (Time.realtimeSinceStartup < 2) {*/
			var lastTime : float = Time.realtimeSinceStartup - thisTime;
			if (Cube1 > 0.5 && lastTime > 0.2) {
			thisTime = Time.realtimeSinceStartup;
/*			var clone = Instantiate(Treebert[0],Vector3(1,2,3),Quaternion.identity); */
			var clone = Instantiate(Treebert[0], Treebert[0].transform.position, Treebert[0].transform.rotation);
			clone.AddComponent(Rigidbody);
			var cloneRB : Rigidbody;
			cloneRB = clone.GetComponent(Rigidbody);
			// Give the cloned object an initial velocity along the current 
			// object's Z axis
			cloneRB.velocity = transform.TransformDirection (Vector3(1,1,1) * 10);
			Destroy(clone, 3);
			}


/*			Debug.Log("Array print" + Time.realtimeSinceStartup);*/
			
			 
			  
			break;
			case 'Cube2': Cubert[i].transform.localScale.y = Cube2; break;
			case 'Cube3': Cubert[i].transform.localScale.y = Cube3; break;
			case 'Cube4': Cubert[i].transform.localScale.y = Cube4; break;
	/*		case 'c3': cubert[i].transform.localScale.y = c3; break;
			case 'c4': cubert[i].transform.localScale.y = c4; break;
			case 'c5': cubert[i].transform.localScale.y = c5; break;
	*/
		}
	}
	/* Spinning Colos! */
	for(var iSpin = 0; iSpin < Spin1bert.length; iSpin++) {
		var initVector1 = Spin1bert[iSpin].transform.localRotation.eulerAngles;
		initVector1.z = 0;
		initVector1.x = 0;
		initVector1.y += 2*Cube1;
		/*Debug.Log("Array print" + Spin1bert[1].transform.localRotation.y);*/
		Spin1bert[iSpin].transform.localRotation = Quaternion.Euler(initVector1);

		var initVector2 = Spin2bert[iSpin].transform.localRotation.eulerAngles;
		initVector2.z = 0;
		initVector2.x = 0;
		initVector2.y += 2*Cube2;
		/*Debug.Log("Array print" + Spin1bert[1].transform.localRotation.y);*/
		Spin2bert[iSpin].transform.localRotation = Quaternion.Euler(initVector2);
		
		var initVector3 = Spin3bert[iSpin].transform.localRotation.eulerAngles;
		initVector3.z = 0;
		initVector3.x = 0;
		initVector3.y += 2*Cube3;
		/*Debug.Log("Array print" + Spin1bert[1].transform.localRotation.y);*/
		Spin3bert[iSpin].transform.localRotation = Quaternion.Euler(initVector3);

		var initVector4 = Spin4bert[iSpin].transform.localRotation.eulerAngles;
		initVector4.z = 0;
		initVector4.x = 0;
		initVector4.y += 2*Cube4;
		/*Debug.Log("Array print" + Spin1bert[1].transform.localRotation.y);*/
		Spin4bert[iSpin].transform.localRotation = Quaternion.Euler(initVector4);

		var initVector5 = AniBean[0].transform.localRotation.eulerAngles;
		initVector5.z += 2*Cube4;
		initVector5.x += 2*Cube4;
		initVector5.y += 2*Cube4;
												


		if (cubein >= 40) {
			subtractnow = 1;
		}
		if (cubein <= 1) {
			subtractnow = 0;
		}
		
		if (subtractnow == 0) {
			cubein += Cube4;
		}
		if (subtractnow == 1) {
			cubein -= Cube4;
		}

		var offsize = Vector2 (cubein,cubein);
		var offsize2 = Vector2 (cubein*0.1,cubein*0.1);
		var offset = Vector2 (Cube4*0.1,Cube4*0.1);
		var offset1 = Vector2 (Cube4,Cube4);
		for(var targcount = 0; targcount < AniTarg.length; targcount++) {
			AniTarg[targcount].GetComponent(Renderer).material.SetTextureOffset("_MainTex", offset1);																		
		}

		for(var beancount = 0; beancount < AniBean.length; beancount++) {
			AniBean[beancount].GetComponent(Renderer).material.SetTextureOffset("_MainTex", offset);																		
			AniBean[beancount].GetComponent(Renderer).material.SetTextureScale ("_MainTex", offsize);
		}
		
		for(var beancount2 = 0; beancount2 < AniBean2.length; beancount2++) {
			AniBean2[beancount2].GetComponent(Renderer).material.SetTextureOffset("_MainTex", offset);																		
			AniBean2[beancount2].GetComponent(Renderer).material.SetTextureScale ("_MainTex", offsize2);
		}
		/*AniBean[0].transform.localRotation = Quaternion.Euler(initVector5);*/
	}
	/*Debug.Log(cubein);*/
	/*Debug.Log("Array print" + spectrum[12]);*/
	/*Debug.Log(AniBean[0].GetComponent(Renderer).material.GetTextureOffset("_MainTex"));*/
		
}
