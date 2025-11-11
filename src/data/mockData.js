export const stats = {
  totalCapital: 1850000,
  capitalChange: 12.5,
  activeLoans: 24,
  loansChange: 3,
  repaymentRate: 96.8,
  repaymentChange: 2.1,
  defaultRate: 3.2,
  defaultChange: -0.5
};

export const repaymentData = [
  { month: 'May', actual: 120000, expected: 118000 },
  { month: 'Jun', actual: 145000, expected: 142000 },
  { month: 'Jul', actual: 165000, expected: 168000 },
  { month: 'Aug', actual: 182000, expected: 180000 },
  { month: 'Sep', actual: 195000, expected: 198000 },
  { month: 'Oct', actual: 218000, expected: 215000 },
  { month: 'Nov', actual: 210000, expected: 220000 }
];

export const portfolioData = [
  { month: 'May', value: 950000 },
  { month: 'Jun', value: 1050000 },
  { month: 'Jul', value: 1180000 },
  { month: 'Aug', value: 1320000 },
  { month: 'Sep', value: 1480000 },
  { month: 'Oct', value: 1650000 },
  { month: 'Nov', value: 1850000 }
];

export const loansByPurpose = [
  { purpose: 'Business', count: 11, color: '#3b82f6' },
  { purpose: 'Medical', count: 5, color: '#8b5cf6' },
  { purpose: 'Education', count: 4, color: '#06b6d4' },
  { purpose: 'Home Repair', count: 2, color: '#10b981' },
  { purpose: 'Vehicle', count: 2, color: '#f59e0b' }
];

export const riskDistribution = [
  { name: 'Low Risk', value: 65, color: '#10b981' },
  { name: 'Medium Risk', value: 28, color: '#f59e0b' },
  { name: 'High Risk', value: 7, color: '#ef4444' }
];

export const borrowers = [
  { 
    id: 'BOR001', 
    name: 'Rajesh Kumar', 
    phone: '+91 9876543210', 
    kycStatus: 'verified', 
    creditScore: 720, 
    riskLevel: 'low', 
    documents: [
      { type: 'Aadhaar Card', subtype: 'Identity Proof', status: 'uploaded' },
      { type: 'PAN Card', subtype: 'Tax ID Proof', status: 'uploaded' },
      { type: 'Selfie with ID', subtype: 'Photo Verification', status: 'uploaded' }
    ]
  },
  { 
    id: 'BOR002', 
    name: 'Priya Sharma', 
    phone: '+91 9876543211', 
    kycStatus: 'pending', 
    creditScore: 680, 
    riskLevel: 'medium', 
    documents: [
      { type: 'Aadhaar Card', subtype: 'Identity Proof', status: 'uploaded' },
      { type: 'PAN Card', subtype: 'Tax ID Proof', status: 'uploaded' }
    ]
  },
  { 
    id: 'BOR003', 
    name: 'Amit Patel', 
    phone: '+91 9876543212', 
    kycStatus: 'verified', 
    creditScore: 750, 
    riskLevel: 'low', 
    documents: [
      { type: 'Aadhaar Card', subtype: 'Identity Proof', status: 'uploaded' },
      { type: 'PAN Card', subtype: 'Tax ID Proof', status: 'uploaded' },
      { type: 'Selfie with ID', subtype: 'Photo Verification', status: 'uploaded' }
    ]
  },
  { 
    id: 'BOR004', 
    name: 'Sunita Devi', 
    phone: '+91 9876543213', 
    kycStatus: 'rejected', 
    creditScore: 620, 
    riskLevel: 'high', 
    documents: [
      { type: 'Aadhaar Card', subtype: 'Identity Proof', status: 'uploaded' },
      { type: 'PAN Card', subtype: 'Tax ID Proof', status: 'uploaded' }
    ]
  },
  { 
    id: 'BOR005', 
    name: 'Mohammed Ali', 
    phone: '+91 9876543214', 
    kycStatus: 'pending', 
    creditScore: 695, 
    riskLevel: 'medium', 
    documents: [
      { type: 'Aadhaar Card', subtype: 'Identity Proof', status: 'uploaded' },
      { type: 'PAN Card', subtype: 'Tax ID Proof', status: 'uploaded' },
      { type: 'Selfie with ID', subtype: 'Photo Verification', status: 'uploaded' }
    ]
  }
];

export const pendingLoans = [
  { 
    id: 'LA006', 
    borrower: 'Rajesh Kumar', 
    borrowerId: 'BOR001', 
    purpose: 'Business Expansion', 
    amount: 25000, 
    interest: 12.5,
    tenure: 12,
    emi: 2208,
    totalRepayment: 26496,
    creditScore: 720, 
    risk: 'low', 
    aiScore: 92,
    kycStatus: 'verified'
  },
  { 
    id: 'LA007', 
    borrower: 'Priya Sharma', 
    borrowerId: 'BOR002', 
    purpose: 'Medical Emergency', 
    amount: 15000, 
    interest: 11,
    tenure: 12,
    emi: 1321,
    totalRepayment: 15852,
    creditScore: 680, 
    risk: 'medium', 
    aiScore: 76,
    kycStatus: 'verified'
  },
  { 
    id: 'LA008', 
    borrower: 'Amit Patel', 
    borrowerId: 'BOR003', 
    purpose: 'Shop Inventory', 
    amount: 30000, 
    interest: 13,
    tenure: 12,
    emi: 2680,
    totalRepayment: 32160,
    creditScore: 750, 
    risk: 'low', 
    aiScore: 95,
    kycStatus: 'verified'
  }
];

export const blockchainTxns = [
  { 
    type: 'disbursement', 
    borrower: 'Rajesh Kumar', 
    loanId: 'LA003', 
    amount: 25000, 
    hash: '0x7ca5cd8a4dda4f4a9dda4f4a', 
    block: 18458912, 
    timestamp: '2025-11-10 14:23:15', 
    gas: '0.0021 ETH', 
    confirmations: 128, 
    status: 'confirmed' 
  },
  { 
    type: 'repayment', 
    borrower: 'Rajesh Kumar', 
    loanId: 'LA003', 
    amount: 2350, 
    hash: '0x7d88cb0d1a2bf94ebb7a', 
    block: 18445621, 
    timestamp: '2025-11-09 10:15:42', 
    gas: '0.0015 ETH', 
    confirmations: 245, 
    status: 'confirmed' 
  },
  { 
    type: 'disbursement', 
    borrower: 'Priya Sharma', 
    loanId: 'LA005', 
    amount: 15000, 
    hash: '0xdc5d6e7f4de5d4c0bef5d', 
    block: 18434512, 
    timestamp: '2025-11-08 16:45:30', 
    gas: '0.0019 ETH', 
    confirmations: 512, 
    status: 'confirmed' 
  },
  { 
    type: 'repayment', 
    borrower: 'Amit Patel', 
    loanId: 'LA002', 
    amount: 1850, 
    hash: '0x0e8ef1a2b1c5da5f6d8e8f', 
    block: 18423456, 
    timestamp: '2025-11-07 09:32:18', 
    gas: '0.0014 ETH', 
    confirmations: 789, 
    status: 'confirmed' 
  },
  { 
    type: 'disbursement', 
    borrower: 'Sunita Devi', 
    loanId: 'LA006', 
    amount: 20000, 
    hash: '0x12a3b3c4d5e8e40ef12db', 
    block: null, 
    timestamp: null, 
    gas: null, 
    confirmations: 3, 
    status: 'pending' 
  }
];