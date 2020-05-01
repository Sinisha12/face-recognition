import React from 'react'
import './FaceRecognition.css'


const FaceRecognition = ({ imageUrl, boxs }) => {     
    return (
        <div className='center ma'>
            <div className='absolute mt2 '>
                <img id='inputImage' alt='' src={imageUrl} width='500px' height='auto'/>
                { boxs.map((box,i) => (
                    <div
                        key={i}  
                        className='bounding-box'
                        style={{
                            top: box.topRow,
                            bottom: box.bottomRow,
                            right: box.rightCol,
                            left: box.leftCol}}>
                    </div>))
                }                               
            </div>
        </div>
    )
}

export default FaceRecognition