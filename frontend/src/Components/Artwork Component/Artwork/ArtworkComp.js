import React from "react";

function ArtworkComp(props) {
    
  const {_id,name,email,pNumber} = props.ARTWORK;
  return (
    <div>
      <h1>Artwork Display</h1>
      <br></br>
      <h1> Name :{name}</h1>
      <h1> Email :{email}</h1>
      <h1> Phone :{pNumber}</h1>
      <button>Delete</button>
      <br></br>
      <button>Update</button>
      <br></br>
    </div>
  );
}

export default ArtworkComp;
