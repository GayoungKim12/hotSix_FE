import axios from 'axios';
import { useEffect, useState } from 'react';
interface RegionOption {
  id: number;
  sido: string;
  sigg: string;
}

interface RegionProps {
  handleRegionIdChange: (regionId: number | null) => void; 
}
const Region =({ handleRegionIdChange }: RegionProps) => {
  const [regionOptions, setRegionOptions] = useState<RegionOption[]>([]);
  const [sido, setSido] = useState<string>("");
  const [sigg, setSigg] = useState<string>("");
  const [regionId, setRegionId] = useState<number | null>(null);


  useEffect(() => {
    const fetchData = async () => {
      const serverUrl = 'http://43.200.78.88:8080/regions';
      const response = await axios.get(serverUrl);
      setRegionOptions(response.data);
    };

    fetchData();
  }, []);


  const sidoOption = [...new Set(regionOptions.map(option => option.sido))]
  const siggOption = sido ? regionOptions.filter(option => option.sido === sido).map(option => option.sigg) : [];
  const selectedRegion =(regionOptions.find(option => option.sido === sido && option.sigg === sigg))

  if (selectedRegion && selectedRegion.id !== regionId) {
    setRegionId(selectedRegion.id);
    handleRegionIdChange(selectedRegion.id);
  }
  
  const handleSiggChange =(e: React.ChangeEvent<HTMLSelectElement>)=>{
    const selectedSigg = e.target.value;
    setSigg(selectedSigg);
    const selectedRegion = regionOptions.find(option => option.sido === sido && option.sigg === selectedSigg);
    if (selectedRegion && selectedRegion.id !== regionId) {
      setRegionId(selectedRegion.id);
      handleRegionIdChange(selectedRegion.id);
    }
  }
  const handleSidoChange =(e: React.ChangeEvent<HTMLSelectElement>)=>{
    const selectedSido = e.target.value;
    setSido(selectedSido);
    setSigg("");
  }


  return (
    <div className="flex flex-col mt-5 items-center">
      <label htmlFor="input-region" className="w-9/12">원하는지역</label>
      <div className="flex justify-between mt-2 w-9/12">
        <select onChange={handleSidoChange} className="py-1 w-5/12 text-sm" id='input-region'>
          <option>시도</option>
          {sidoOption.map((option)=>(
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
        <select onChange={handleSiggChange} className="w-5/12 text-sm">
          <option disabled>시군구</option>
          {siggOption.map((option)=>(
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </div>
      <input type="text" name="regionId" className="hidden" defaultValue={regionId !==null ? String(regionId) : ''}/>
    </div>
  );
};
export default Region
