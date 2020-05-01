import React from 'react';
import './App.css';

import Navigation from './components/Navigation/Navigation'
import Logo from './components/Logo/Logo'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import Rank from './components/Rank/Rank'
import FaceRecognition from './components/FaceRecognition/FaceRecognition'
import Signin from './components/Signin/Signin'
import RegisterForm from './components/Register/Register'


import Particles from 'react-particles-js'
import Clarifai from 'clarifai'


const app = new Clarifai.App({
  apiKey: '1d726dbf171f462b88b2822d16db0887'
 });

const particlesOptions = {
  particles: {
    number: {
      value: 50,
      density: {
        enable: true,
        value_area: 800,
          
      }
    }
  }
}

class App extends React.Component {
  constructor(){
    super()
    this.state = {
      input: '',
      imageUrl: '',
      boxs: [],
      route: 'signin',
      isSignedIn: false,
    }
  }

  calculateFaceLocation = (data) =>{ 
    const image = document.getElementById('inputImage')
    const width = Number(image.width)
    const height = Number(image.height)  
    const regions = data.outputs[0].data.regions 
    const boundingBox = regions.map(region => {
      const box = {
        leftCol: region.region_info.bounding_box.left_col * width,
        topRow: region.region_info.bounding_box.top_row * height,
        rightCol: width - (region.region_info.bounding_box.right_col*width),
        bottomRow: height - (region.region_info.bounding_box.bottom_row * height)
      }
      return box
    })

    return boundingBox
    
  }
  
  displayFaceBox = (boxs) => {
    this.setState({boxs})
  }

  onInputChange = (event) =>{
    this.setState({input: event.target.value})
  }

  onSubmit = () => {
    this.setState({imageUrl: this.state.input})
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
    .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))   
    .catch(err => console.log(err))    
  }
  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState({isSignedIn: false})
    }else if( route === 'home'){
      this.setState({isSignedIn: true})
    }
    this.setState({route})
  }

  render(){
    return (
      <div className="App">
        <Particles className='particles' params={particlesOptions} />
        <Navigation onRouteChange={this.onRouteChange} isSignedIn={this.state.isSignedIn} />
        { this.state.route === 'home' ?
          <div>
            <Logo />
            <Rank /> 
            <ImageLinkForm onInputChange={this.onInputChange} onSubmit={this.onSubmit}/>
            <FaceRecognition imageUrl={this.state.imageUrl} boxs={this.state.boxs}/>
          </div> 
          : (
            this.state.route === 'signin'?
            <Signin onRouteChange={this.onRouteChange}/> :
            <RegisterForm onRouteChange={this.onRouteChange} />
          )
        }      
      </div>
    );
  }
}

export default App;
