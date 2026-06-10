import { Routes, Route } from "react-router-dom";

// Layouts
import AuthLayout from "../layouts/AuthLayout";

// Auth
import Login from "../pages/auth/Login";
import EsqueciSenha from "../pages/auth/EsqueciSenha";
import VerificarEmail from "../pages/auth/VerificarEmail";
import RedefinirSenha from "../pages/auth/RedefinirSenha";

// Site
import NotFound from "../pages/site/NotFound";

//Dashboard Admin
import DashboardAdmin from "../pages/admin/DashboardAdmin";
import EquipamentosAdmin from "../pages/admin/EquipamentosAdmin";
import ManutencaoAdmin from "../pages/admin/ManutencaoAdmin";
import OcorrenciasAdmin from "../pages/admin/OcorrenciasAdmin";
import StockAdmin from "../pages/admin/StockAdmin";
import RelatoriosAdmin from "../pages/admin/RelatoriosAdmin";
import IndicadoresAdmin from "../pages/admin/IndicadoresAdmin";
import UtilizadoresAdmin from "../pages/admin/UtilizadoresAdmin";
import ConfiguracoesAdmin from "../pages/admin/ConfiguracoesAdmin";
import NotificacoesAdmin from "../pages/admin/NotificacoesAdmin";
import NotFoundAdmin from "../pages/admin/NotFoundAdmin";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Rotas de autenticação */}
      <Route element={<AuthLayout />}>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/esqueci-senha" element={<EsqueciSenha />} />
        <Route path="/verificar-email" element={<VerificarEmail />} />
        <Route path="/redefinir-senha" element={<RedefinirSenha />} />
      </Route>

      {/* Página não encontrada */}
      <Route path="*" element={<NotFound />} />

      {/* dashboard Admin*/}
      <Route path="/dashboard/admin/">
          <Route path="" element={<DashboardAdmin />} />
          <Route path="equipamentos" element={<EquipamentosAdmin />} />
          <Route path="manutencoes" element={<ManutencaoAdmin />} />
          <Route path="ocorrencias" element={<OcorrenciasAdmin />} />
          <Route path="stock" element={<StockAdmin />} />
          <Route path="relatorios" element={<RelatoriosAdmin />} />
          <Route path="indicadores" element={<IndicadoresAdmin />} />
          <Route path="utilizadores" element={<UtilizadoresAdmin />} />
          <Route path="configuracoes" element={<ConfiguracoesAdmin />} />
          <Route path="notificacoes" element={<NotificacoesAdmin />} />
          <Route path="*" element={<NotFoundAdmin />} />
      </Route>
    </Routes>
  );
}
