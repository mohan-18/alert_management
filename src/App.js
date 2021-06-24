import Button from "@material-ui/core/Button"
import {Link} from "react-router-dom";

function App() {
	
	return (
		<div>
			<h1>Welcome</h1>
		
			<Link to="/user">
			<Button style={{'margin-top': '8px','margin-bottom': '8px'}} variant="contained" color="primary">
				find Beetle net
				</Button>
			</Link>
			<br/>
			<Link to="/branch">	
			<Button style={{'marginTop': '8px','marginBottom': '8px'}} variant="contained" color="primary">
				Branch Login
				</Button>
			</Link>
			<br/>
			<Link to="/admin">	
				<Button style={{'marginTop': '8px','marginBottom': '8px'}} variant="contained" color="primary">
				Admin Login
				</Button>
			</Link>
			
		</div>
	)
}

export default App
