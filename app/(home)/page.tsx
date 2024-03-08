import { ptBR } from "date-fns/locale";
import { Header } from "../components/header";
import { format } from "date-fns";
import Search from "./component/search";

const Home = () => {
  return (
    <>
      <Header />
      
      <div className="px-5 pt-5">
        <h2 className="text-xl font-bold">Olá Jack!</h2>
        <p className="capitalize text-sm">{format(new Date(), "EEEE',' dd ' de 'MMMM", { locale: ptBR })}</p>
      </div>

      <div className="px-5 mt-6"><Search /></div>
    </>
  );
}

export default Home;