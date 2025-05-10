export interface EnhanceRequest {
    prompt: string;
  }
  
  export interface EnhanceResponse {
    document: Document;
    change_summary: string;
    reasoning_trace: ReasoningTrace;
    old_outputs?: any;
  }
  
  export interface Document {
    pages: Page[];
  }
  
  export interface Page {
    title: string;
    content: Record<string, any>;
  }
  
  export interface ReasoningTrace {
    uiria: UIRIA;
    fcia: FCIA;
    spia: SPIA;
    arda: ARDA;
    stsa: STSA;
  }
  
  interface UIRIA {
    context: string;
    identified_FAS: string;
    extracted_entities: string[];
    user_intent: string;
  }
  
  interface FCIA {
    identified_gaps: Array<{
      clause: string;
      issue: string;
      justification: string;
    }>;
    affected_clauses: string[];
    user_context: string;
    FAS_reference: string;
  }
  
  interface SPIA {
    shariah_solution: string;
    updated_shariah_clauses: Array<{
      clause_id: string;
      text: string;
      reference: string;
    }>;
    references: string[];
  }
  
  interface ARDA {
    updated_accounting_clauses: Array<{
      clause_id: string;
      text: string;
      reference: string;
    }>;
    rationale: string;
    references: string[];
  }
  
  interface STSA {
    all_updated_sections: {
      shariah: any;
      accounting: any;
      disclosure: any;
      definitions: any;
    };
    change_log: string[];
    references: string[];
  }