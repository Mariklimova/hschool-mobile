export interface iDescription {
    readonly id: number;
    readonly code: string;
    readonly link: string[];
    readonly question: string;
    readonly answer: string;
  }
  
  export interface iTopic {
    readonly assets: string;
    readonly description: iDescription[];
  }