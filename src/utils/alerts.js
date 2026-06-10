import Swal from "sweetalert2";

export const showSuccessAlert = (
  title = "Sucesso!",
  text = "Operação realizada com sucesso."
) => {
  return Swal.fire({
    icon: "success",
    title,
    text,
    confirmButtonColor: "#25471F",
  });
};

export const showErrorAlert = (
  title = "Erro!",
  text = "Ocorreu um erro inesperado."
) => {
  return Swal.fire({
    icon: "error",
    title,
    text,
    confirmButtonColor: "#25471F",
  });
};

export const showWarningAlert = (
  title = "Atenção!",
  text = "Verifique os dados informados."
) => {
  return Swal.fire({
    icon: "warning",
    title,
    text,
    confirmButtonColor: "#25471F",
  });
};

export const showConfirmAlert = async (
  title = "Tem certeza?",
  text = "Esta ação não poderá ser revertida."
) => {
  const result = await Swal.fire({
    icon: "question",
    title,
    text,
    showCancelButton: true,
    confirmButtonColor: "#25471F",
    cancelButtonColor: "#dc2626",
    confirmButtonText: "Sim",
    cancelButtonText: "Cancelar",
  });

  return result.isConfirmed;
};
