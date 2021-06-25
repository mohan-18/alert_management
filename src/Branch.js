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
	const [alert,setalert]=useState("");
	br=brname;
	
	useEffect(()=>{
		socket=io("https://alertserver18.herokuapp.com/");
	},[])
    
    useEffect(() => {  
        socket.on("notification", async(pin,contact) => {
		let url=`https://alertserver18.herokuapp.com/alert/${br}`;

		const response = await axios.get(url);
		let data = response.data;
		let sorted_data=data.reverse();
		setdata(sorted_data);
		toast.success(`A user with ${contact} is looking in the pincode ${pin}`);
        });
		return;
    }, []);

	
    
	const onMessageSubmit = async (e) => {
		e.preventDefault();
		let url =`https://alertserver18.herokuapp.com/branch/branch/${brname}`;
        
		let response = await axios.get(url);
		let data = response.data;
		if(data.length===0){
			setalert(`No branch with name '${brname}' exists`);
			return;
		}else{
			setalert("");
		}
		
		socket.emit('join',{brname});
		url=`https://alertserver18.herokuapp.com/alert/${brname}`;
		
		axios.get(url)
            .then(response => {
                let data = response.data;
				let sorteddata=data.reverse();
				if(data.length===0){
					setalert(`No Alerts in the '${brname}' till now`);
				}else
				setalert("");
				setdata(sorteddata);
            })
            .catch(err => {
                console.log(err);
            })
	}
	const onTextChange = (e) => {
		let str=String(e.target.value);
		str=str.toLowerCase();
		setbrname(str);
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
				<h1>{alert}</h1>
			}
			{ 
				dataArr.map(ele=>(
					<Alert key={ele._id} pincode={ele.Pincode} branch={ele.Branch_Name}
					contact={ele.Contact} created={ele.createdAt} />
				))
			}
		</div>
	)
}

export default Branch
