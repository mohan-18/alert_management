import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
import React, { useEffect, useState } from "react"
import io from "socket.io-client"
import axios from 'axios';
import Cardview from './Cardview'


let socket;

function User() {
	const [pin,setpin]=useState("");
	const [contact,setcontact]=useState("");
	const [dataArr,setdata]=useState([]);
	useEffect(()=>{
		socket=io("https://alertserver18.herokuapp.com/");
	},[])


	const onMessageSubmit = async (e) => {
		e.preventDefault();

		url=`https://alertserver18.herokuapp.com/branch/pin/${pin}`;
			response = await axios.get(url);
            let data = response.data;

		if(data.length>0){
			console.log("found");
		url="https://alertserver18.herokuapp.com/alert/";
        
			response = await axios.post(url, {
			pincode: pin,
			contact: contact
			  });
			  socket.emit('alert',{pin,contact});
		}else{
			console.log("not found");
			data = "Sorry No branches serving this pincode right now";
			socket.emit('noBranch',{pin,contact});
		}	
			
		setdata(data);
           
			
	}
	const onTextChangepin = (e) => {
		setpin(e.target.value);

		}
		const onTextChangeno = (e) => {
			setcontact(e.target.value);
	  }


	return (
		<div>
			<form >
				<h1>Scavenger Hunt</h1>
				<div>
					<TextField name="brname" onChange={onTextChangepin} value={pin} label="Enter a pincode" />
				</div>
				<div>
					<TextField name="contact" onChange={onTextChangeno} value={contact} label="Enter your contact details" />
				</div>
				<Button style={{'marginTop': '8px','marginBottom': '8px'}} variant="contained" color="primary" onClick={onMessageSubmit}>Send</Button>
	
			</form>
			
			{ 
				dataArr.map(ele=>(
					<Cardview key={ele._id} branch_incharge={ele.Branch_Incharge} branch_name={ele.Branch_Name} 
					contact={ele.Contact_Number} address={ele.Address} city={ele.City} />
				))
			}
		</div>
	)
}

export default User
