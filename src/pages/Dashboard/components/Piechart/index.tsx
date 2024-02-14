import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { InvestmentData } from '../../../../store/dashboard/interface';

type Props = {
	isDarkModeEnabled: boolean;
	data: InvestmentData[];
};

const PieChart: React.FC<Props> = ({ data, isDarkModeEnabled }) => {
	const options = {
		chart: {
			type: 'pie',
			backgroundColor: isDarkModeEnabled ? '#CCCCCC' : '#ffffff'
		},
		title: {
			text: 'Investment Protfolion'
		},
		colors: isDarkModeEnabled
			? [
					'#483D8B', // Dark slate blue
					'#556B2F', // Dark olive green
					'#B8860B', // Dark goldenrod
					'#E9967A', // Dark salmon
					'#00CED1', // Dark turquoise
					'#9400D3' // Dark violet
			  ]
			: [
					'#87CEEB', // Sky blue
					'#90EE90', // Light green
					'#FFD700', // Gold
					'#FFA07A', // Light salmon
					'#FF69B4', // Hot pink
					'#FF6347' // Tomato
			  ],
		series: [
			{
				name: 'Share',
				data: data.map((item) => ({ name: item.name, y: item.share })),
				tooltip: {
					format: '{series.name}: {y}%'
				}
			}
		]
	};

	return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default PieChart;
