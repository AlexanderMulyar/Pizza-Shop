import AllStafs from "./Header/AllStafs";

function AllStafsBottom() {
	return (
		<div className="position-fixed bottom-0 py-2 bg-white d-md-none w-100 all-stafs-bottom">
			<div className="d-flex justify-content-center">
				<AllStafs />
			</div>
		</div>
	);
}

export default AllStafsBottom;