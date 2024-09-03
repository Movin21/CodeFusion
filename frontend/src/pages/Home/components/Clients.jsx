import {
  stripe,
  peloton,
  linkedin,
  goldmansachs,
  bloomberg,
  atlassian,
  adobe,
  vmVare,
} from "../assets";
import styles from "../styles";

const Clients = () => {
  return (
    <div className={`${styles.flexCenter} gap-1 sm:gap-4 flex-wrap my-10 `}>
      <img src={peloton} alt="" className="w-100px h-[40px]" />
      <img src={atlassian} alt="" className="w-100px h-[60px]" />
      <img src={bloomberg} alt="" className="w-100px h-[60px]" />
      <img src={vmVare} alt="" className="w-100px h-[60px]" />
      <img src={stripe} alt="" className="w-100px h-[60px]" />
      <img src={goldmansachs} alt="" className="w-100px h-[60px]" />
      <img src={adobe} alt="" className="w-100px h-[60px]" />
      <img src={linkedin} alt="" className="w-100px h-[60px]" />
    </div>
  );
};
export default Clients;
