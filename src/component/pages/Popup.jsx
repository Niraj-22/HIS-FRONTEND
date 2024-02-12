import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import { PieChart } from "@mui/x-charts";

export default function Popup({ userData, setShowModal, showModal }) {
  const data = [
    { id: 0, value: 20, label: "Project 1" },
    { id: 1, value: 20, label: "Project 2" },
    { id: 2, value: 20, label: "Project 3" },
    { id: 3, value: 40, label: "Project 4" },
  ];
  return (
    <Modal
      aria-labelledby="modal-title"
      aria-describedby="modal-desc"
      variant="outlined"
      open={showModal}
      onClose={(e) => {
        e.stopPropagation();
        setShowModal((prev) => !prev);
      }}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Sheet
        sx={{
          maxWidth: 800,
          borderRadius: "md",
          p: 3,
          boxShadow: "lg",
        }}
      >
        <ModalClose variant="plain" sx={{ m: 1 }} />
        <Typography
          component="h2"
          id="modal-title"
          level="h4"
          textColor="inherit"
          fontWeight="lg"
          mb={1}
        >
          {userData.name}
        </Typography>
        <Typography id="modal-desc" textColor="text.tertiary">
          Email : {userData.email}
        </Typography>
        <Typography id="modal-desc" textColor="text.tertiary">
          Department : {userData.departmentName}
        </Typography>
        <Typography id="modal-desc" textColor="text.tertiary">
          Position : {userData.position}
        </Typography>
        <Typography id="modal-desc" textColor="text.tertiary">
          Projects :
        </Typography>
        <Sheet
          sx={{
            maxWidth: 800,
            borderRadius: "md",
            p: 2,
            boxShadow: "lg",
            m: 1,
            display: "flex",
            justifyContent: "space-evenly",
          }}
        >
          <button className="bg-gray-300 p-1 text-sm m-1">Project 1</button>
          <button className="bg-gray-300 p-1 text-sm m-1">Project 2</button>
          <button className="bg-gray-300 p-1 text-sm m-1">Project 3</button>
          <button className="bg-gray-300 p-1 text-sm m-1">Project 4</button>
        </Sheet>

        <PieChart
          series={[
            {
              data,
              highlightScope: { faded: "global", highlighted: "item" },
              faded: { innerRadius: 30, additionalRadius: -30, color: "gray" },
            },
          ]}
          width={400}
          height={200}
        />
      </Sheet>
    </Modal>
  );
}
