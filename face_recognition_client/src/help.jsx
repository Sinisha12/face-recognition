const box = {
    leftCol: region.region_info.boundingBox.left_col * width,
    topRow: region.region_info.boundingBox.top_row * height,
    rightCol: width - (region.region_info.boundingBox.right_col*width),
    bottomRow: height - (region.region_info.boundingBox.bottom_row * height)
  }


                  {
				boxs.map((box) => (<Box box={box.map(box => box)} />))                 
                }


                //{for (let box1 in boxs) {console.log(boxs[box1])}}