import React, { useEffect, useState } from "react"
import axios from 'axios';
import Cardview from './Cardview'
import io from "socket.io-client"
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Alert from './Alert';
let socket;

function Admin() {
	const [dataArr,setdata]=useState([]);
	const [datanoti,setdatanoti]=useState([]);

	useEffect(()=>{
		socket=io("https://alertserver18.herokuapp.com/");
		socket.emit('admin');
	},[])

	useEffect(() => {  
        socket.on("notification", async(pin,contact) => {
		console.log("hit from socket");	
		let url=`https://alertserver18.herokuapp.com/alert/alerts/all`;

		const response = await axios.get(url);
		let data = response.data;
		let sorted_data=data.reverse();
		console.log(sorted_data);
		setdatanoti(sorted_data);
		toast.success(`A user with ${contact} is looking in the pincode ${pin}`);
        });
    }, []);
	
	useEffect(() => { 
        
		let url='https://alertserver18.herokuapp.com/alert/alerts/all';	
			axios.get(url)
            .then(response => {
                const data = response.data;
				let sorteddata=data.reverse();
				setdatanoti(sorteddata);
            })
            .catch(err => {
                console.log(err);
            })
		url=`https://alertserver18.herokuapp.com/branch/all`;
        
		axios.get(url)
            .then(response => {
                const data = response.data;
				let sorteddata=data.reverse();
				setdata(sorteddata);
            })
            .catch(err => {
                console.log(err);
            })
			
    }, []);

	return (
		<div>
			<h1>Alerts....</h1>
                <br/>
				{ 
				datanoti.map(ele=>(
					<Alert key={ele._id} pincode={ele.Pincode} 
					contact={ele.Contact} created={ele.createdAt} />
				))
			}
			<br/>
				<h1>Branches....</h1>
                <br/>
			
			{ 
            dataArr.map(ele=>(
                <Cardview key={ele._id} branch_incharge={ele.Branch_Incharge} branch_name={ele.Branch_Name} 
                contact={ele.Contact_Number} address={ele.Address} city={ele.City} pincode={ele.Pincode_Covered} />
            ))
			}
		</div>
	)
}

export default Admin
