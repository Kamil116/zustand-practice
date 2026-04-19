import "./App.css";
import Column from "@/components/Column/Column.tsx";
import { COLUMN_TYPES } from "@/lib/constants.ts";

function App() {
	return (
		<div className="App">
			<div className="columns">
				{Object.values(COLUMN_TYPES).map((type) => (
					<Column state={type} key={type} />
				))}
			</div>
		</div>
	);
}

export default App;
