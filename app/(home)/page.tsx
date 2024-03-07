import { ptBR } from "date-fns/locale";
import { Header } from "../components/header";
import { format } from "date-fns";

const Home = () => {
  return (
    <>
      <Header />
      <div className="px-5 pt-5">
        <h2 className="text-xl font-bold">Olá Jack!</h2>
        <p className="capitalize text-sm">{format(new Date(), "EEEE',' dd ' de 'MMMM", { locale: ptBR })}</p>
      </div>
    </>
  );
}

export default Home;