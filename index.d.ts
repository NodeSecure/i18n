declare namespace ntlp {
    interface license {
        uniqueLicenseIds: string[];
        spdxLicenseLinks?: string[];
        spdx?: {
            osi: boolean;
            fsf: boolean;
            fsfAndOsi: boolean;
            includesDeprecated: boolean;
        };
        from: string;
    }

    interface result {
        licenses: license[];
        hasMultipleLicenses: boolean;
        uniqueLicenseIds: string[];
    }

}

declare function ntlp(tarballDir: string): Promise<ntlp.result>;

export = ntlp;
export as namespace ntlp;
