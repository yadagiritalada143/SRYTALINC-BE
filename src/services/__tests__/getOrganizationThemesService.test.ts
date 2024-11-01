import OrganizationThemesModel from '../../model/organizationThemesModel';
import themesService from '../../services/common/getOrganizationThemesService'; 

jest.mock('../../model/organizationThemesModel'); 

describe('getOrgThemes', () => {
    const mockOrgName = 'TestOrganization';
    
    afterEach(() => {
        jest.clearAllMocks(); 
    });

    it('should return organization themes successfully', async () => {
        const mockTheme = {
            organization_name: mockOrgName,
            themeDetails: {
                color: 'blue',
                logo: 'testLogo.png'
            }
        };

        (OrganizationThemesModel.findOne as jest.Mock).mockResolvedValue(mockTheme);

        const result = await themesService.getOrgThemes(mockOrgName);

        expect(OrganizationThemesModel.findOne).toHaveBeenCalledWith({ organization_name: mockOrgName });
        expect(result).toEqual(mockTheme);
    });

    it('should return null if no themes are found', async () => {
        (OrganizationThemesModel.findOne as jest.Mock).mockResolvedValue(null);

        const result = await themesService.getOrgThemes(mockOrgName);

        expect(OrganizationThemesModel.findOne).toHaveBeenCalledWith({ organization_name: mockOrgName });
        expect(result).toBeNull();
    });

    it('should log an error and return it if an exception occurs', async () => {
        const mockError = new Error('Database error');

        (OrganizationThemesModel.findOne as jest.Mock).mockRejectedValue(mockError);

        const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {}); 

        const result = await themesService.getOrgThemes(mockOrgName);

        expect(OrganizationThemesModel.findOne).toHaveBeenCalledWith({ organization_name: mockOrgName });
        expect(consoleSpy).toHaveBeenCalledWith('Error occured while fetching the themes: ', mockError);
        expect(result).toBe(mockError);

        consoleSpy.mockRestore(); 
    });
});
