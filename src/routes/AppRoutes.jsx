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

//Dashboard Supervisor
import DashboardSupervisor from "../pages/supervisor/DashboardSupervisor";
import EquipamentoSupervisor from "../pages/supervisor/EquipamentoSupervisor";
import ManutencaoSupervisor from "../pages/supervisor/ManutencaoSupervisor";
import OcorrenciasSupervisor from "../pages/supervisor/OcorrenciasSupervisor";
import RelatoriosSupervisor from "../pages/supervisor/RelatoriosSupervisor";
import IndicadoresSupervisor from "../pages/supervisor/IndicadoresSupervisor";
import ConfiguracoesSupervisor from "../pages/supervisor/ConfiguracoesSupervisor";
import NotificacoesSupervisor from "../pages/supervisor/NotificacoesSupervisor";
import NotFoundSupervisor from "../pages/supervisor/NotFoundSupervisor";

//Dashboard Técnico
import DashboardTecnico from "../pages/tecnico/DashboardTecnico";
import EquipamentoTecnico from "../pages/tecnico/EquipamentoTecnico";
import OcorrenciasTecnico from "../pages/tecnico/OcorrenciasTecnico";
import ConfiguracoesTecnico from "../pages/tecnico/ConfiguracoesTecnico";
import NotificacoesTecnico from "../pages/tecnico/NotificacoesTecnico";
import NotFoundTecnico from "../pages/tecnico/NotFoundTecnico";

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

      {/* dashboard Admin */}
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

      {/* dashboard Supervisor */}
      <Route path="/dashboard/supervisor/">
        <Route path="" element={<DashboardSupervisor />} />
        <Route path="equipamentos" element={<EquipamentoSupervisor />} />
        <Route path="manutencoes" element={<ManutencaoSupervisor />} />
        <Route path="ocorrencias" element={<OcorrenciasSupervisor />} />
        <Route path="relatorios" element={<RelatoriosSupervisor />} />
        <Route path="indicadores" element={<IndicadoresSupervisor />} />
        <Route path="configuracoes" element={<ConfiguracoesSupervisor />} />
        <Route path="notificacoes" element={<NotificacoesSupervisor />} />
        <Route path="*" element={<NotFoundSupervisor />} />
      </Route>

      {/* dashboard Técnico */}
      <Route path="/dashboard/tecnico/">
        <Route path="" element={<DashboardTecnico />} />
        <Route path="equipamentos" element={<EquipamentoTecnico />} />
        <Route path="ocorrencias" element={<OcorrenciasTecnico />} />
        <Route path="configuracoes" element={<ConfiguracoesTecnico />} />
        <Route path="notificacoes" element={<NotificacoesTecnico />} />
        <Route path="*" element={<NotFoundTecnico />} />
      </Route>
    </Routes>
  );
}
