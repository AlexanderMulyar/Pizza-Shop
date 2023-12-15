import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import SidebarSettings from "../components/Settings/SidebarSettings";

const Settings = () => {
	return (
		<div className="settigns">
			<Container fluid='md'>
				<div className="d-flex flex-md-row flex-column">
					<SidebarSettings/>
					<Outlet/>
				</div>
			</Container>
		</div>
	);
}
 
export default Settings;