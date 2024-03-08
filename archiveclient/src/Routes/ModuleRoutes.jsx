const ModuleRoutes = () => {
  return (
    <div
      onClick={() => {
        sessionStorage.clear();
        window.location.reload();
      }}
    >
      ModuleRoutes
    </div>
  );
};

export default ModuleRoutes;
