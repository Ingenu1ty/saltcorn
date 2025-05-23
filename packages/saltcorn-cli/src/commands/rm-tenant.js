/**
 * @category saltcorn-cli
 * @module commands/rm-tenant
 */
const { Command, Flags } = require("@oclif/core");
const inquirer = require("inquirer").default;
/**
 * RmTenantCommand Class
 * @extends oclif.Command
 * @category saltcorn-cli
 */
class RmTenantCommand extends Command {
  /**
   * @returns {Promise<void>}
   */
  async run() {
    const { flags } = await this.parse(RmTenantCommand);

    const { deleteTenant } = require("@saltcorn/admin-models/models/tenant");

    if (!flags.force) {
      const answer = await inquirer.prompt([
        {
          type: "confirm",
          name: "proceed",
          message: `This will delete tenant ${flags.tenant}. Attention! All tenant data will be lost!\nContinue (y/n)?`,
          default: false,
        },
      ]);
      if (!answer.proceed) {
        console.log(`Success: Command execution canceled`);
        this.exit(1);
      }
    }
    // make changes
    await deleteTenant(flags.tenant);

    this.exit(0);
  }
}

/**
 * @type {object}
 */
RmTenantCommand.args = []; /*[
  { name: "tenant", required: true, description: "Tenant to remove" },
];
*/
/**
 * @type {string}
 */
RmTenantCommand.description = `Remove a tenant.
Attention! All tenant data will be lost!
It recommended to make backup of tenant before perform this command.
`;

/**
 * @type {object}
 */
RmTenantCommand.help = `Remove a tenant.
Attention! All tenant data will be lost!
It recommended to make backup of tenant before perform this command.
`;

/**
 * @type {object}
 */
RmTenantCommand.flags = {
  force: Flags.boolean({ char: "f", description: "force command execution" }),
  tenant: Flags.string({
    char: "t",
    description: "tenant",
    required: true,
  }),
};

module.exports = RmTenantCommand;
