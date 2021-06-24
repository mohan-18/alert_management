import TextField from "@material-ui/core/TextField"
import React, { useEffect, useState } from "react"
import Button from "@material-ui/core/Button"
import io from "socket.io-client"
import axios from 'axios';
import Alert from './Alert';
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

let socket;
let br;

toast.configure();
function Branch() {
	const [brname,setbrname]=useState("");
	const [dataArr,setdata]=useState([]);
	br=brname;
	useEffect(()=>{
		socket=io("https://alertserver18.herokuapp.com/");
	},[])
    
    useEffect(() => {  
        socket.on("notification", async(pin,contact) => {
		let url=`https://alertserver18.herokuapp.com/alert/${br}`;


        console.log("hit",url,br);

		const response = await axios.get(url);
		let data = response.data;
		let sorted_data=data.reverse();
		console.log(sorted_data);
		setdata(sorted_data);
		toast.success(`A user with ${contact} is looking in the pincode ${pin}`);
        });
    }, []);
    
	const onMessageSubmit = (e) => {
		e.preventDefault();
		socket.emit('join',{brname});
		let url=`https://alertserver18.herokuapp.com/alert/${brname}`;
		console.log(brname,url);
		axios.get(url)
            .then(response => {
                let data = response.data;
				let sorteddata=data.reverse();
				setdata(sorteddata);
            })
            .catch(err => {
                console.log(err);
            })
	}
	const onTextChange = (e) => {
		setbrname(e.target.value);
		}


	return (
		<div>
			<form onSubmit={onMessageSubmit}>
				<h1>Branch Login</h1>
				<div>
					<TextField name="brname" onChange={onTextChange} value={brname} label="Branch Name" />
				</div>
				<Button style={{'marginTop': '8px','marginBottom': '8px'}} variant="contained" color="primary" onClick={onMessageSubmit}>Enter</Button>
			</form>
			{ 
				dataArr.map(ele=>(
					<Alert key={ele._id} pincode={ele.Pincode} 
					contact={ele.Contact} created={ele.createdAt} />
				))
			}
		</div>
	)
}

export default Branch