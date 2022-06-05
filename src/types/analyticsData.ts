export type ReportInhalationT = {
  i_plan: number; //planned inhalations in moment of inhalations done
  dvc: string; //device id
  start: number; //session start time in milisecs
  stop: number; //session stop time in milisecs
  ox_er: number; //oxygens earned this session
  md_n: string; //medicine name
  md_a: number; //medicine amount
  i_dur_down: number; //inhalation duration inhale duration in seconds
  i_dur_up: number; //inhalation duration exhale duration in seconds
  miss_c: number; //missed coins during this inhalation
};
