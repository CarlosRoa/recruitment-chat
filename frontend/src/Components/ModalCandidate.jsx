import React from 'react';
import { Modal, Typography, Paper, Grid, Button } from '@mui/material';
import { styled } from '@mui/system';
import { useTheme } from '@mui/material/styles';


// Estilos para la modal usando styled
const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  margin: theme.spacing(2),
  maxWidth: 600,
  backgroundColor: theme.palette.primary.modalCandidateBackground,
  border: '2px solid #000',
  color: "white"
}));

const StyledTitle = styled(Typography)(({ theme }) => ({
  textAlign: 'center',
  fontWeight: 'bold',
  fontSize: '1.5rem',
}));

const StyledData = styled(Typography)(({ theme }) => ({
  textAlign: 'left',
  fontSize: '1rem',
}));

// Componente que muestra la modal
const ModalCandidate = ({ data }) => {

    const theme = useTheme();
  // Estado para controlar la apertura y cierre de la modal
  const [open, setOpen] = React.useState(false);

  // Función para abrir la modal
  const handleOpen = () => {
    setOpen(true);
  };

  // Función para cerrar la modal
  const handleClose = () => {
    setOpen(false);
  };

  // Función para formatear la lista de tecnologías separadas por punto y coma
  const formatList = (list) => {
    return list?.split(';').join(', ');
  };

  // Función para mostrar la información de la modal
  const renderData = () => {
    return (
      <StyledPaper>
        <StyledTitle>Información del Candidato</StyledTitle>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <StyledData>
              <b>Field1:</b> {data?.field1}
            </StyledData>
            <StyledData>
              <b>Age:</b> {data?.Age}
            </StyledData>
            <StyledData>
              <b>Accessibility:</b> {data?.Accessibility}
            </StyledData>
            <StyledData>
              <b>EdLevel:</b> {data?.EdLevel}
            </StyledData>
            <StyledData>
              <b>Employment:</b> {data?.Employment}
            </StyledData>
            <StyledData>
              <b>Gender:</b> {data?.Gender}
            </StyledData>
            <StyledData>
              <b>MentalHealth:</b> {data?.MentalHealth}
            </StyledData>
          </Grid>
          <Grid item xs={6}>
            <StyledData>
              <b>MainBranch:</b> {data?.MainBranch}
            </StyledData>
            <StyledData>
              <b>YearsCode:</b> {data?.YearsCode}
            </StyledData>
            <StyledData>
              <b>YearsCodePro:</b> {data?.YearsCodePro}
            </StyledData>
            <StyledData>
              <b>Country:</b> {data?.Country}
            </StyledData>
            <StyledData>
              <b>PreviousSalary:</b> {data?.PreviousSalary}
            </StyledData>
            <StyledData>
              <b>HaveWorkedWith:</b> {formatList(data?.HaveWorkedWith)}
            </StyledData>
            <StyledData>
              <b>ComputerSkills:</b> {data?.ComputerSkills}
            </StyledData>
            <StyledData>
              <b>Employed:</b> {data?.Employed}
            </StyledData>
          </Grid>
        </Grid>
      </StyledPaper>
    );
  };

  return (
    <div>
    {data && Object.keys(data).length > 0 ? <Button sx={{bgcolor: "darkblue", color: "white" }} onClick={handleOpen}>Ver Detalles</Button> : <></>}
      <Modal
        open={open}
        onClose={handleClose}
        backgroundColor={theme.palette.primary.modalCandidateBackground}
        sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }}
      >
        {renderData()}
      </Modal>
    </div>
  );
};

export default ModalCandidate;
