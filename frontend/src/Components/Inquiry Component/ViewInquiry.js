<<<<<<< Updated upstream
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Viewinquiries from './ViewInquiries';
import NavigationBar from '../Nav Component/NavigationBar';
import FooterComp from '../Nav Component/FooterComp';

const URL ="http://localhost:5000/inquiry";


const fetchHandler = async () => {
    return await axios.get(URL).then((res) => res.data);
};


export default function ViewInquiry(){
    const [inquiryData, setInquiries] = useState();

    useEffect(() => {                                                                                                                                                                                                                                                                                                       
        fetchHandler().then((data) => setInquiries(data.inquiryData)); 
    },[]);

    return(

<div>
    <NavigationBar/>
     <br></br> 
    <div>
        {inquiryData && inquiryData.map((INQUIRY, i) => (
            
                <div>
                <Viewinquiries key={i} INQUIRY={INQUIRY} />
                </div>
        ))}
        </div> 
        <FooterComp/>
    </div>
    );
}
=======
import React,{useState} from 'react';
import axios from 'axios';
const URL = "http://localhost:5000/inquiry";

const fetchHandler = async () => { 

    return await axios.get(URL).then((res)=>res.data);
}
export default function ViewInquiry(){

    const [inquiryData, setInquiryData] = React.useState();
    useEffect(() => {
        fetchHandler().then((data) =>  setInquiryData(data.inquiryData));
        },[])
    }

    return(

        <div>
            <h1>View Inquiry</h1>
        </div>
    )

>>>>>>> Stashed changes
