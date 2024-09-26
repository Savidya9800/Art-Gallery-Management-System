import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';

import NavigationBar from '../../Nav Component/NavigationBar';
import Viewresponses from './Viewresponses';
import FooterComp from '../../Nav Component/FooterComp';

const URL = "http://localhost:5000/adminResponse";

const fetchHandler = async () => {
    return await axios.get(URL).then((res) => res.data);
};

export default function ViewResponse() {

    

    const[responseData, setResponses] = useState();

    useEffect(() => {
        fetchHandler().then((data) => setResponses(data.responseData)); //backend display 

}, []);

    return (
    
<div>
            <NavigationBar />
            <br></br>

            <div>

                <h1>Admin Responses</h1>

                {responseData && responseData.map((RESPONSE, i) => (
                    <div>
                        <Viewresponses key={i} RESPONSE={RESPONSE} />
                    </div>
                    
                ))}

                </div>
            <FooterComp />
            </div>
    );

}