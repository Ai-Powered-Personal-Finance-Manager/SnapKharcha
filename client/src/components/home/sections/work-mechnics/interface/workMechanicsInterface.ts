export interface stepsInterface {
  step: string;
  title: string;
  description: string;
  image: string;
  color: string;
  bg: string;
  border: string;
}

export interface WorkingStepsInterface {
  steps: stepsInterface[];
}
