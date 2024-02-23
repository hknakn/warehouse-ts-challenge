import { fetchData } from '../api';
import { Data } from '../types/types';

const getData = async (): Promise<Data> => {
  try {
    const heatPumps = await fetchData('heatPumps');
    const installationMaterials = await fetchData('installationMaterials');
    const tools = await fetchData('tools');
    const orders = await fetchData('orders');

    return { heatPumps, installationMaterials, tools, orders };
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export default getData;