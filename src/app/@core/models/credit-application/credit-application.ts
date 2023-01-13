export interface ICreditApplicationList {
    items: [ICreditApplicationDetail];
    pageCount: number;
    totalItemCount: number;
    pageNumber: number;
    pageSize: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
}
export interface ICreditApplicationDetail {
    id: string;
    createdAt: Date;
    status: string;
    customerId: string;
    customerCreatedAt: Date;
    requestingAmount: number;
    approvedAmount?: number;
    repaymentDay: number;
    currentProcessor: {
        id: string;
        fullname: string;
    };
    processors: [
        {
            id: string;
            fullname: string;
        }
    ];
    customerData: {
        durationOfActualResidenceLocation: string;
        dependentsCount: string;
        educationDegree: string;
        occupation: {
            income: number;
            workAddress: string;
            workExperience: string;
            documents: [string];
        };
        additionalIncomes: {
            additionalProp1: {
                work: string;
                value: number;
            };
            additionalProp2: {
                work: string;
                value: number;
            };
            additionalProp3: {
                work: string;
                value: number;
            };
        };
        maritalStatus: string;
        spouseData: {
            name: string;
            surname: string;
            patronymic: string;
            phoneNumber: string;
            incomes: {
                additionalProp1: {
                    work: string;
                    value: number;
                };
                additionalProp2: {
                    work: string;
                    value: number;
                };
                additionalProp3: {
                    work: string;
                    value: number;
                };
            };
        };
        realEstates: {
            additionalProp1: {
                type: string;
                address: string;
            };
            additionalProp2: {
                type: string;
                address: string;
            };
            additionalProp3: {
                type: string;
                address: string;
            };
        };
        personalEstates: {
            additionalProp1: {
                type: string;
                brand: string;
                model: string;
                manufactureYear: number;
            };
            additionalProp2: {
                type: string;
                brand: string;
                model: string;
                manufactureYear: number;
            };
            additionalProp3: {
                type: string;
                brand: string;
                model: string;
                manufactureYear: number;
            };
        };
        editRequiredProperties: {
            additionalProp1: [string];
            additionalProp2: [string];
            additionalProp3: [string];
        };
    };
    oclRequestCustomerDataEntries: [
        {
            durationOfActualResidenceLocation: string;
            dependentsCount: string;
            educationDegree: string;
            occupation: {
                income: number;
                workAddress: string;
                workExperience: string;
                documents: [string];
            };
            additionalIncomes: {
                additionalProp1: {
                    work: string;
                    value: number;
                };
                additionalProp2: {
                    work: string;
                    value: number;
                };
                additionalProp3: {
                    work: string;
                    value: number;
                };
            };
            maritalStatus: string;
            spouseData: {
                name: string;
                surname: string;
                patronymic: string;
                phoneNumber: string;
                incomes: {
                    additionalProp1: {
                        work: string;
                        value: number;
                    };
                    additionalProp2: {
                        work: string;
                        value: number;
                    };
                    additionalProp3: {
                        work: string;
                        value: number;
                    };
                };
            };
            realEstates: {
                additionalProp1: {
                    type: string;
                    address: string;
                };
                additionalProp2: {
                    type: string;
                    address: string;
                };
                additionalProp3: {
                    type: string;
                    address: string;
                };
            };
            personalEstates: {
                additionalProp1: {
                    type: string;
                    brand: string;
                    model: string;
                    manufactureYear: number;
                };
                additionalProp2: {
                    type: string;
                    brand: string;
                    model: string;
                    manufactureYear: number;
                };
                additionalProp3: {
                    type: string;
                    brand: string;
                    model: string;
                    manufactureYear: number;
                };
            };
            editRequiredProperties: {
                additionalProp1: [string];
                additionalProp2: [string];
                additionalProp3: [string];
            };
        }
    ];
    comments: [
        {
            id: string;
            createdAt: Date;
            commentatorId: string;
            commentatorFullname: string;
            text: string;
        }
    ];
    debtorInformation: {
        numberOfDaysOverdue: number;
        numberOfDelays: number;
        numberOfReceivedLoans: number;
        numberOfParallelLoans: number;
        parallelLoansMonthlyInstallment: number;
    };
    debtorInformationReportUrl: string;
}
export interface IScoringCreditApplication {
    identificationScore: {
        rejected: boolean;
        stopFactors: [
            {
                name: string;
                description: string;
                weight: number;
            }
        ];
        rejectionFactors: [
            {
                description: string;
                name: string;
            }
        ];
        scoreRiskType: string;
        score: number;
        standardizedScore: number;
        genderValue: string;
        ageValue: number;
        residenceRegionValue: string;
        actualResidenceRegionValue: string;
        gender: number;
        age: number;
        residenceLocation: number;
        actualResidenceLocation: number;
    };
    personalInformationScore: {
        rejected: boolean;
        stopFactors: [
            {
                name: string;
                description: string;
                weight: number;
            }
        ];
        rejectionFactors: [
            {
                description: string;
                name: string;
            }
        ];
        scoreRiskType: string;
        score: number;
        standardizedScore: number;
        maritalStatusValue: string;
        dependentsCountValue: string;
        durationOfResidenceAtTheActualLocationValue: string;
        realEstateAvailabilitiesValue: [string];
        personalEstateAvailabilitiesValue: [string];
        maritalStatus: number;
        dependentsCount: number;
        durationOfResidenceAtTheActualLocation: number;
        realEstateAvailability: number;
        personalEstateAvailability: number;
    };
    solvencyScore: {
        rejected: boolean;
        stopFactors: [
            {
                name: string;
                description: string;
                weight: number;
            }
        ];
        rejectionFactors: [
            {
                description: string;
                name: string;
            }
        ];
        scoreRiskType: string;
        score: number;
        standardizedScore: number;
        employeePositionValue: string;
        entrepreneurshipTypeValue: string;
        incomeValue: number;
        workExperienceValue: string;
        additionalIncomeValue: number;
        employeePosition: number;
        entrepreneurshipType: number;
        income: number;
        workExperience: number;
        additionalIncome: number;
    };
    creditHistoryScore: {
        rejected: boolean;
        stopFactors: [
            {
                name: string;
                description: string;
                weight: number;
            }
        ];
        rejectionFactors: [
            {
                description: string;
                name: string;
            }
        ];
        scoreRiskType: string;
        score: number;
        standardizedScore: number;
        numberOfDaysOverdueValue: number;
        numberOfDelaysValue: number;
        clientHistoryTypeValue: string;
        numberOfReceivedLoansValue: number;
        numberOfParallelLoansValue: number;
        numberOfDaysOverdue: number;
        numberOfDelays: number;
        clientHistoryType: number;
        numberOfReceivedLoans: number;
        numberOfParallelLoans: number;
    };
    loanCircumstances: {
        requestingAmount: number;
        requestedMonths: number;
        monthlyInstallment: number;
        income: number;
        parallelLoansMonthlyInstallment: number;
        expenses: number;
        expensesForDependents: number;
    };
    rejected: boolean;
    stopFactorRejection: boolean;
    stopFactorSum: number;
    percentage: number;
    score: number;
}
