#include "ofApp.h"

//--------------------------------------------------------------
void ofApp::setup(){
	shader.load("shader.vert", "water2.frag");

	int value;
	glGetIntegerv(GL_MAX_TEXTURE_SIZE, &value);   //Returns 1 value
	total = 210 + 297;
	printW = (210 / total) * (value - 1);
	printH = (297 / total) * (value - 1);

	largeOffscreenImage.allocate(printW, printH, GL_RGBA);

	w = ofGetWidth();
	h = ofGetHeight();

	printMode = false;
}

//--------------------------------------------------------------
void ofApp::update(){

}

//--------------------------------------------------------------
void ofApp::draw(){
	if (printMode) {
		largeOffscreenImage.begin();
		ofClear(255, 255, 255, 255);
	}

	float resolution[] = { w, h };

	shader.begin();

	shader.setUniform1f("u_time", ofGetElapsedTimef());
	shader.setUniform2fv("u_resolution", resolution);

	ofDrawRectangle(0, 0, w, h);

	shader.end();

	if (printMode) {
		largeOffscreenImage.end();
		ofRectangle bounds(0, 0, ofGetWidth(), ofGetHeight());
		ofRectangle target(0, 0, w, h);
		target.scaleTo(bounds);

		largeOffscreenImage.draw(target);
	}
}

//--------------------------------------------------------------
void ofApp::keyPressed(int key){
	if (key == 's') {

		if (printMode) {
			ofPixels p;
			largeOffscreenImage.readToPixels(p);
			ofSaveImage(p, "print_" + ofGetTimestampString() + ".jpg");
		}
		else {
			ofSaveScreen("savedScreenshot_" + ofGetTimestampString() + ".jpg");
		}
		
	}

	if (key == 'p') {
		printMode = !printMode;

		if (!printMode) {
			w = ofGetWidth();
			h = ofGetHeight();
		}
		else {
			w = printW;
			h = printH;
		}
	}

}

//--------------------------------------------------------------
void ofApp::keyReleased(int key){

}

//--------------------------------------------------------------
void ofApp::mouseMoved(int x, int y ){

}

//--------------------------------------------------------------
void ofApp::mouseDragged(int x, int y, int button){

}

//--------------------------------------------------------------
void ofApp::mousePressed(int x, int y, int button){

}

//--------------------------------------------------------------
void ofApp::mouseReleased(int x, int y, int button){

}

//--------------------------------------------------------------
void ofApp::mouseEntered(int x, int y){

}

//--------------------------------------------------------------
void ofApp::mouseExited(int x, int y){

}

//--------------------------------------------------------------
void ofApp::windowResized(int w, int h){

}

//--------------------------------------------------------------
void ofApp::gotMessage(ofMessage msg){

}

//--------------------------------------------------------------
void ofApp::dragEvent(ofDragInfo dragInfo){ 

}
