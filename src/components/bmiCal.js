import { useState } from "react";
import "./bmiCal.css";
import "bootstrap/dist/css/bootstrap.min.css";
// let isValidInput;

function Bmi() {
  const DATA_ADVICE_RESULT = [
    {
      message: "Chỉ số BMI dưới 18.5 là thiếu cân.",
      advice:
        "Bạn cần phải đi khám bác sĩ và áp dụng một chế độ tập luyện thể thao, dinh dưỡng tốt nhất để có thể tăng cân an toàn, đảm bảo sức khỏe.",
    },
    {
      message: "Chỉ số BMI từ 18.5 đến 24.9 là bình thường.",
      advice:
        "Bạn có một cơ thể tốt và khỏe mạnh. Hãy tiếp tục duy trì rèn luyện thể thao và ăn uống đầy đủ nhé.",
    },
    {
      message: "Chỉ số BMI từ 25.0 đến 29.9 được coi là thừa cân.",
      advice:
        "Tình trạng thừa cân lúc này chưa quá trầm trọng, tuy nhiên bạn hãy tìm phương pháp và chế độ giảm cân phù hợp để sớm đưa cơ thể về vóc dáng cân đối, đảm bảo sức khỏe và phòng ngừa bệnh tật.",
    },
    {
      message: "Chỉ số BMI bằng hoặc trên 30 được xem là béo phì.",
      advice:
        "Ở cấp độ béo phì, cơ thể của bạn gặp khó khăn mỗi ngày khi trọng lượng mỡ tạo áp lực lên cơ xương. Từ đó, không chỉ sinh hoạt của bạn bị xáo trộn mà sức khỏe của bạn cũng bị ảnh hưởng rất nhiều. Bạn nên đi khám bác sĩ để được tư vấn phương pháp giảm cân phù hợp và hiệu quả nhất. ",
    },
  ];
  const EXPLAIN = "Chỉ số BMI (Body Mass Index) hay còn gọi là chỉ số khối cơ thể, chỉ số thể trọng, là một công cụ thường được sử dụng để đo lượng mỡ trong cơ thể. Chỉ số BMI chuẩn được tính dựa trên chiều cao và cân nặng, áp dụng cho nam và nữ trưởng thành.";

  const [state_InputHeight, set_InputHeight] = useState("");
  const [state_InputWeight, set_InputWeight] = useState("");
  // Trả về số BMI và kết luận
  const [state_result_BMI, set_Result_BMI] = useState("");
  const [state_result_title, set_result_title] = useState("Chỉ số BMI là gì? Chỉ số BMI của bạn:");

  // Kết luận ngắn
  const [state_result_status, set_result_status] = useState("");
  // Lời khuyên chi tiết
  const [state_advice_content, set_advice_content] = useState(EXPLAIN);

  function getHeightInputValue(event) {
    set_InputHeight(event.target.value);
    // setFeedback("");
  }
  function getWeightInputValue(event) {
    set_InputWeight(event.target.value);
    // setFeedback("");
  }
  // Nhấn nút chạy tính toán số BMI
  let height_meter, weight_kg;
  function get_Cal_BMI() {
    console.log("Tiến thành tính ố BMI");
    height_meter = state_InputHeight / 100;
    weight_kg = state_InputWeight;

    let bmi = (weight_kg / (height_meter * height_meter)).toFixed(1);
    console.log("Kết quả bmi", bmi);
    set_Result_BMI(bmi);
    set_result_title("Chỉ số BMI của bạn:");

    let bmi_status_specific;
    if (bmi < 18.5) {
      bmi_status_specific = DATA_ADVICE_RESULT[0];
    } 
    else if (bmi >= 18.5 && bmi < 25) {
      bmi_status_specific = DATA_ADVICE_RESULT[1];
    } 
    else if (bmi >= 25 && bmi < 30) {
      bmi_status_specific = DATA_ADVICE_RESULT[2];
    } 
    else {
      bmi_status_specific = DATA_ADVICE_RESULT[3];
    }
    console.log("bmi_status_specific[0]: ", bmi_status_specific);

    let result_status = bmi_status_specific.message;
    set_result_status(result_status);
    let advice_content = bmi_status_specific.advice;
    set_advice_content(advice_content);
  }

  function reset_value() {
    console.log("Tải lại trạng thái bạn đầu - reset");
    // window.location.reload()
    set_InputHeight(""); set_InputWeight("");
    set_Result_BMI(""); set_result_title("Chỉ số BMI là gì? Chỉ số BMI của bạn:");
  }

  return (
    <>
      <div className=" bmi-container   container-fluid ">
        <div className=" bmi-form   container ">
          {/* 1 */}
          <div className=" cal-input-val ">
            <div className=" cal-input-title ">Tính chỉ số cơ thể BMI</div>
            {/* Nhập vào chiều cao cân - nặng */}
            <div className=" cal-inputs ">
              <input
                value={state_InputHeight}
                onChange={getHeightInputValue}
                placeholder="Nhập vào chiều cao (cm)"
                type="number"
              />

              <input
                value={state_InputWeight}
                onChange={getWeightInputValue}
                placeholder="Nhập vào cân nặng (kg)"
                type="number"
              />
            </div>
            {/* Nhấn tính toán */}
            <div className=" calculate-buttons ">
              <span onClick={get_Cal_BMI} className=" get-calculate ">
                Tính BMI
              </span>

              <span onClick={reset_value} className=" reset-btn ">
                Reset
              </span>
            </div>
          </div>
          {/* 2 */}
          <div className=" result-information ">
            {/* Tiêu đề và chỉ số BMI */}
            <div className=" result ">
              <span>
                <p className=" result-title "> {state_result_title} </p>
                <b className=" result-number "> {state_result_BMI} </b>
              </span>

              <i className=" result-status ">
                {/* Kết luận ngắn */}
                {state_result_status}
              </i>
            </div>

            {/* Kết luật và nôi dung tư vấn */}
            <div className=" result-advice-content ">
              {/* Nội dung khuyên */}
              {state_advice_content}
            </div>

            {/* { data_result_component } */}
          </div>
        </div>
      </div>
    </>
  );
}

export default Bmi;
