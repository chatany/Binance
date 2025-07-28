import { ChartEmbed } from '../pages/chart';

const TradingViewChart = () => {
 
  return (
    <div className='min-h-screen'>

    <ChartEmbed searchQuery={"BTCUSDT"} className="h-[700px]"/>
    </div>
  );
};

export default TradingViewChart;