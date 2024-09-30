import React from "react";
import NavigationBar from "../Nav Component/NavigationBar";
import FooterComp from "../Nav Component/FooterComp";
import "./sellArt.css";
import Form from "react-bootstrap/Form";

function GalleryComp() {
  return (
    <div>
      <NavigationBar />
      <form className="form">
        <div className=" relative w-[523px] h-[830px]">
          <div className="absolute w-[513px] h-[776px] bg-white border-2 border-black rounded-[25px]"></div>
          <div className=" bg-white absolute left-[100px] top-[25px] text-[#A78F51] text-[25px] font-[400] font-Inter">
            Artwork Submission form
          </div>
          <div className=" bg-white absolute w-[169px] h-[25px] left-[327px] top-[78px] flex items-center justify-center shadow-[0px_4px_4px_rgba(0,0,0,0.25)] rounded-t-[4px] border-b border-[#B2B2B2] text-[#767676] text-[16px] font-[400] font-Inter">
            Artist Information
          </div>
          <div className=" bg-white absolute left-[26px] top-[125px] text-black text-[18px] font-[400] font-Inter ">
            Full Name
          </div>
          <input
            type="text"
            className=" bg-white absolute w-[470px] h-[48px] left-[26px] top-[157px] border border-black rounded-[15px]"
          />

          <div className=" bg-white absolute left-[25px] top-[222px] text-black text-[18px] font-[400] font-Inter">
            Email
          </div>
          <input className=" bg-white absolute w-[470px] h-[48px] left-[26px] top-[252px] border border-black rounded-[15px]"></input>

          <div className=" bg-white absolute left-[25px] top-[316px] text-black text-[18px] font-[400] font-Inter">
            Phone Number
          </div>
          <input className=" bg-white absolute w-[470px] h-[48px] left-[25px] top-[348px] border border-black rounded-[15px]"></input>

          <div className=" bg-white absolute left-[25px] top-[408px] text-black text-[18px] font-[400] font-Inter">
            Website/Portfolio
          </div>
          <input className=" bg-white absolute w-[470px] h-[48px] left-[25px] top-[440px] border border-black rounded-[15px]"></input>

          <div className=" bg-white absolute left-[28px] top-[508px] text-black text-[18px] font-[400] font-Inter">
            Biography
          </div>
          

          <input className=" bg-white absolute w-[470px] h-[48px] left-[26px] top-[540px] border border-black rounded-[15px]"></input>

          <div className=" bg-white absolute left-[25px] top-[603px] text-black text-[18px] font-[400] font-Inter">
            Artist Statement
          </div>
          <input className=" bg-white absolute w-[468px] h-[107px] left-[25px] top-[635px] border border-black rounded-[15px]"></input>
          
          <div className=" absolute w-[90px] h-[34px] left-[433px] top-[796px] flex items-center justify-center gap-[8px] rounded-[8px]">
            <div className="text-[#1E1E1E] text-[24px] font-[400] font-Inter">
              Next
            </div>
          </div>
          <div>
          
          </div>
        </div>
      </form>

      <FooterComp />
    </div>
  );
}

export default GalleryComp;
